const HeroSlide = require("../models/HeroSlide");
const Initiative = require("../models/Initiative");
const WhyChoose = require("../models/WhyChoose");
const SiteNotice = require("../models/SiteNotice");
const HomeQuickInfo = require("../models/HomeQuickInfo");
const InitiativeInquiry = require("../models/InitiativeInquiry");
const SankalpPhoto = require("../models/SankalpPhoto");
const KalashYatra = require("../models/KalashYatra");
const VideoNews = require("../models/news/VideoNews");
const {
  defaultHeroSlides,
  defaultInitiatives,
  defaultWhyChoose,
  defaultNotices,
  defaultQuickInfo,
} = require("../scripts/seedHomeData");
const { defaultGalleryPhotos } = require("../scripts/seedGalleryData");

// Public Home Page
exports.getHomePage = async (req, res) => {
  try {
    const [heroSlides, initiatives, whyChooseDoc, notices, quickInfoDoc, galleryPhotos, kalashDoc, newsDocs] =
      await Promise.all([
        HeroSlide.find({ isActive: true }).sort({ order: 1, createdAt: 1 }).limit(10),
        Initiative.find({ isActive: true }).sort({ order: 1, createdAt: 1 }).limit(24),
        WhyChoose.findOne(),
        SiteNotice.find({ isActive: true }).sort({ order: 1, createdAt: 1 }).limit(20),
        HomeQuickInfo.findOne(),
        SankalpPhoto.find({ isPublished: true }).sort({ order: 1, date: -1 }).limit(10),
        KalashYatra.getOrSeed().catch(() => KalashYatra.defaultData),
        VideoNews.find({ published: true })
          .sort({ publicationDate: -1, publishedAt: -1, createdAt: -1 })
          .limit(10)
          .lean()
          .catch(() => []),
      ]);

    // Fallbacks if database is completely empty or just initialized
    const finalHeroSlides =
      heroSlides && heroSlides.length > 0 ? heroSlides : defaultHeroSlides;
    const finalInitiatives =
      initiatives && initiatives.length > 0 ? initiatives : defaultInitiatives;
    const finalWhyChoose = whyChooseDoc || defaultWhyChoose;
    const finalNotices =
      notices && notices.length > 0 ? notices : defaultNotices;
    const finalQuickInfo = quickInfoDoc || defaultQuickInfo;
    const finalGalleryPhotos =
      galleryPhotos && galleryPhotos.length > 0 ? galleryPhotos : defaultGalleryPhotos.slice(0, 10);

    const kalash = kalashDoc || KalashYatra.defaultData;

    // Helper to extract YouTube video ID
    function getYouTubeId(url) {
      if (!url || typeof url !== "string") return "";
      const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([\w-]{11})/);
      return match ? match[1] : "";
    }

    function getVimeoId(url) {
      if (!url || typeof url !== "string") return "";
      try {
        const parsed = new URL(url);
        if (!/(^|\.)vimeo\.com$/i.test(parsed.hostname)) return "";
        return parsed.pathname.match(/\/(?:video\/)?(\d+)(?:\/|$)/)?.[1] || "";
      } catch {
        return "";
      }
    }

    // Helper to resolve an effective thumbnail URL
    function resolveThumb(thumb, videoUrl, fallback = "/images/kalash-yatra-hero.jpg") {
      if (thumb && thumb.trim() && !thumb.includes("/images/kalash-yatra-hero.jpg")) {
        return thumb.trim();
      }
      const ytId = getYouTubeId(videoUrl);
      if (ytId) {
        return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
      }
      const vimeoId = getVimeoId(videoUrl);
      if (vimeoId) {
        return `https://vumbnail.com/${vimeoId}.jpg`;
      }
      return thumb && thumb.trim() ? thumb.trim() : fallback;
    }

    // Dynamic Highlight Video: check if any video in kalash.videos is marked as isHighlighted
    let highlightVideo = null;
    let highlightedVidId = null;

    if (kalash && kalash.videos && kalash.videos.length > 0) {
      const foundHighlight = kalash.videos.find((v) => v.isHighlighted);
      if (foundHighlight) {
        highlightedVidId = String(foundHighlight._id);
        const resolvedPoster = resolveThumb(foundHighlight.thumbnail, foundHighlight.videoUrl);
        highlightVideo = {
          _id: foundHighlight._id,
          title: foundHighlight.title,
          videoUrl: foundHighlight.videoUrl,
          posterImage: resolvedPoster,
          duration: foundHighlight.duration || "12:45 Min",
          badge: "★ मुख्य संकल्प वीडियो",
          tag: foundHighlight.tag || "मुख्य वीडियो",
          district: foundHighlight.district,
          state: foundHighlight.state,
          description: foundHighlight.description || "",
        };
      }
    }

    // Fallback to hero.featuredVideo if no video is explicitly marked isHighlighted
    if (!highlightVideo && kalash && kalash.hero && kalash.hero.featuredVideo) {
      const fv = kalash.hero.featuredVideo;
      highlightVideo = {
        title: fv.title,
        duration: fv.duration || "12:00 Min",
        videoUrl: fv.videoUrl,
        posterImage: resolveThumb(fv.posterImage, fv.videoUrl),
        badge: fv.badge || "★ मुख्य संकल्प वीडियो",
      };
    }

    // Show up to ten videos in the home page carousel.
    let latestVideos = [];
    if (kalash && kalash.videos && kalash.videos.length > 0) {
      latestVideos = kalash.videos
        .slice(0, 10)
        .map((v) => {
          const raw = v.toObject ? v.toObject() : { ...v };
          return {
            ...raw,
            thumbnail: resolveThumb(raw.thumbnail, raw.videoUrl, "/images/kalash-yatra-featured.jpg"),
          };
        });
    } else if (kalash && kalash.milestonesSection && kalash.milestonesSection.items) {
      latestVideos = kalash.milestonesSection.items.slice(0, 10);
    }

    // Latest news for the home page carousel
    let highlightNews = null;
    let homeNewsList = [];

    if (newsDocs && newsDocs.length > 0) {
      homeNewsList = newsDocs.slice(0, 10);
    }

    // Convert initiatives to client-side modal dictionary
    const initiativesModalMap = {};
    finalInitiatives.forEach((item) => {
      initiativesModalMap[item.key] = {
        tag: item.modalTag || item.cardTag,
        title: item.modalTitle || item.title,
        description: item.modalDescription || item.description,
        highlights:
          item.modalHighlights && item.modalHighlights.length > 0
            ? item.modalHighlights
            : item.points || [],
        helplineText: item.helplineText || finalQuickInfo.helplineText,
        helplineTel: item.helplineTel || finalQuickInfo.helplineTel,
        formTitle: item.formTitle || "Registration & Support Form",
        formSubmitText: item.formSubmitText || "Send Support Request",
      };
    });

    res.render("index", {
      title: "Nishad Sankalp Campaign",
      metaDescription: "Learn about the Nishad Aarakshan Sankalp campaign, its initiatives, community programs, news, videos, and the Sankalp Yatra for unity and empowerment.",
      heroSlides: finalHeroSlides,
      initiatives: finalInitiatives,
      initiativesModalMap,
      whyChoose: finalWhyChoose,
      notices: finalNotices,
      quickInfo: finalQuickInfo,
      galleryPhotos: finalGalleryPhotos,
      kalash,
      highlightVideo,
      latestVideos,
      highlightNews,
      homeNewsList,
    });
  } catch (error) {
    console.error("Home page render error:", error);
    const kalashFallback = KalashYatra.defaultData;
    // Safe render with defaults so the user's site never crashes
    res.render("index", {
      title: "Nishad Sankalp Campaign",
      metaDescription: "Learn about the Nishad Aarakshan Sankalp campaign, its initiatives, community programs, news, videos, and the Sankalp Yatra for unity and empowerment.",
      heroSlides: defaultHeroSlides,
      initiatives: defaultInitiatives,
      initiativesModalMap: {},
      whyChoose: defaultWhyChoose,
      notices: defaultNotices,
      quickInfo: defaultQuickInfo,
      galleryPhotos: defaultGalleryPhotos.slice(0, 10),
      kalash: kalashFallback,
      highlightVideo: kalashFallback?.hero?.featuredVideo || null,
      latestVideos: (kalashFallback?.videos || []).slice(0, 10),
      highlightNews: null,
      homeNewsList: [],
    });
  }
};

// Handle Sidebar Pledge Submission
exports.submitPledge = async (req, res) => {
  try {
    const { name, phone, district } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: "Name and Phone required" });
    }

    const inquiry = await InitiativeInquiry.create({
      type: "pledge",
      category: "Online Pledge",
      name: name.trim(),
      phone: phone.trim(),
      district: district ? district.trim() : "",
      message: "Online pledge submitted via website sidebar.",
      status: "new",
    });

    res.json({
      success: true,
      message: "Your pledge has been successfully registered.",
      id: inquiry._id,
    });
  } catch (error) {
    console.error("Pledge submission error:", error);
    res.status(500).json({ success: false, message: "An error occurred, please try again." });
  }
};

// Handle Initiative Modal Form Submission
exports.submitInitiativeInquiry = async (req, res) => {
  try {
    const { name, phone, district, category, message } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: "Name and Phone required" });
    }

    const inquiry = await InitiativeInquiry.create({
      type: "initiative",
      category: category ? category.trim() : "Initiative Support",
      name: name.trim(),
      phone: phone.trim(),
      district: district ? district.trim() : "",
      message: message ? message.trim() : "",
      status: "new",
    });

    res.json({
      success: true,
      message: "Your request has been successfully registered.",
      id: inquiry._id,
    });
  } catch (error) {
    console.error("Initiative submission error:", error);
    res.status(500).json({ success: false, message: "An error occurred, please try again." });
  }
};
