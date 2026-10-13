const HeroSlide = require("../models/HeroSlide");
const Initiative = require("../models/Initiative");
const WhyChoose = require("../models/WhyChoose");
const SiteNotice = require("../models/SiteNotice");
const HomeQuickInfo = require("../models/HomeQuickInfo");
const HomeAbout = require("../models/HomeAbout");
const InitiativeInquiry = require("../models/InitiativeInquiry");
const SankalpPhoto = require("../models/SankalpPhoto");
const KalashYatra = require("../models/KalashYatra");
const VideoNews = require("../models/news/VideoNews");
const ContactInfo = require("../models/ContactInfo");

// Public Home Page
exports.getHomePage = async (req, res) => {
  try {
    const [heroSlides, initiatives, whyChooseDoc, notices, quickInfoDoc, galleryPhotos, kalashDoc, newsDocs, homeAboutDoc, contactInfoDoc] =
      await Promise.all([
        HeroSlide.find({ isActive: true }).sort({ order: 1, createdAt: 1 }).limit(10),
        Initiative.find({ isActive: true }).sort({ order: 1, createdAt: 1 }).limit(24),
        WhyChoose.findOne(),
        SiteNotice.find({ isActive: true }).sort({ order: 1, createdAt: 1 }).limit(20),
        HomeQuickInfo.findOne(),
        SankalpPhoto.find({ isPublished: true }).sort({ order: 1, date: -1 }).limit(10),
        KalashYatra.findOne().lean(),
        VideoNews.find({ published: true })
          .sort({ publicationDate: -1, publishedAt: -1, createdAt: -1 })
          .limit(10)
          .lean()
          .catch(() => []),
        HomeAbout.findOne(),
        ContactInfo.findOne().lean().catch(() => null),
      ]);

    const finalHeroSlides = heroSlides || [];
    const finalInitiatives = initiatives || [];
    const finalWhyChoose = whyChooseDoc || {};
    const finalNotices = notices || [];
    const finalQuickInfo = quickInfoDoc || {};
    const finalHomeAbout = homeAboutDoc || {};
    const finalGalleryPhotos = galleryPhotos || [];
    const kalash = kalashDoc || {};

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
      const t = String(thumb || "").trim();
      const u = String(videoUrl || "").trim();
      const isVideoWebpage = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com|player\.vimeo\.com)\//i.test(t);
      if (t && !isVideoWebpage && (/\.(jpe?g|png|webp|gif|avif)($|\?)/i.test(t) || t.includes("/uploads/") || t.includes("cloudinary.com") || t.includes("unsplash.com") || t.includes("vumbnail.com") || t.includes("ytimg.com"))) {
        return t;
      }
      const ytId = getYouTubeId(u || t);
      if (ytId) {
        return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
      }
      const vimeoId = getVimeoId(u || t);
      if (vimeoId) {
        return `https://vumbnail.com/${vimeoId}.jpg`;
      }
      return fallback;
    }

    // The homepage query returns the first highlighted video in stored order.
    let highlightVideo = null;
    let highlightedVidId = null;

    if (kalash && kalash.highlightedVideo) {
      const foundHighlight = kalash.highlightedVideo;
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
      homeAbout: finalHomeAbout,
      contactInfo: contactInfoDoc || {},
    });
  } catch (error) {
    console.error("Home page render error:", error);
    res.status(500).render("index", {
      title: "Nishad Sankalp Campaign",
      heroSlides: [], initiatives: [], initiativesModalMap: {}, whyChoose: {}, notices: [],
      quickInfo: {}, galleryPhotos: [], kalash: {}, highlightVideo: null, latestVideos: [],
      highlightNews: null, homeNewsList: [], homeAbout: {}, contactInfo: {},
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
