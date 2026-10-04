const AdminActivityLog = require("../../models/admin/AdminActivityLog");
const KalashYatra = require("../../models/KalashYatra");
const { getPagination } = require("../../utils/pagination");

// View Kalash Yatra Manager
exports.getKalashYatraManager = async (req, res) => {
  try {
    let kalash = await KalashYatra.findOne().select("-videos");
    if (!kalash) {
      await KalashYatra.create(KalashYatra.defaultData);
      kalash = await KalashYatra.findOne().select("-videos");
    }
    const activeTab = req.query.tab || "videos";
    const countRows = await KalashYatra.aggregate([
      { $project: { total: { $size: { $ifNull: ["$videos", []] } } } },
    ]);
    const videoPagination = getPagination(req.query.page, countRows[0]?.total || 0, 25);
    const videoPageDoc = await KalashYatra.findById(kalash._id)
      .select({ videos: { $slice: [videoPagination.skip, videoPagination.pageSize] } })
      .lean();
    kalash.videos = videoPageDoc?.videos || [];
    kalash.videosTotal = videoPagination.total;

    // Auto-seed initial 2 logs if collection is empty
    const count = await AdminActivityLog.countDocuments({ module: "kalash-yatra" });
    if (count === 0) {
      const currentEmail = (req.session.admin && req.session.admin.email) || "admin@gmail.com";
      const currentName = (req.session.admin && req.session.admin.name) || "Super Admin";
      await AdminActivityLog.create([
        {
          adminEmail: currentEmail,
          adminName: currentName,
          module: "kalash-yatra",
          section: "वीडियो गैलरी (Video Gallery)",
          action: "वीडियो संकलन एवं उपस्थित जनसमूह संख्या सेटअप",
          details: "23 संकल्प वीडियो एवं 'How Many People (उपस्थित लोग संख्या)' फ़ील्ड सेटअप किया गया।",
        },
        {
          adminEmail: currentEmail,
          adminName: currentName,
          module: "kalash-yatra",
          section: "लोकतांत्रिक महा-संकल्प (Pledge)",
          action: "ऐतिहासिक लोकतांत्रिक महा-संकल्प पत्र सुरक्षित",
          details: "मतदाता जागरूकता एवं स्वतंत्र मताधिकार संकल्प पत्र को सक्रिय किया गया।",
        },
      ]);
    }

    const recentLogs = await AdminActivityLog.find({ module: "kalash-yatra" })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    const lastTwoChanges = recentLogs.slice(0, 2);

    res.render("admin/kalash-yatra/index", {
      title: "संकल्प यात्रा प्रबंधन (Sankalp Yatra Management)",
      admin: req.session.admin,
      kalash,
      videoPagination,
      pagination: videoPagination,
      paginationPath: "/admin/kalash-yatra",
      paginationQuery: { tab: "videos" },
      activeTab,
      recentLogs,
      lastTwoChanges,
      currentPath: "/admin/kalash-yatra",
      message: req.query.msg || null,
      error: req.query.err || null,
    });
  } catch (error) {
    console.error("Fetch Kalash Yatra manager error:", error);
    res.status(500).redirect("/admin/dashboard?err=" + encodeURIComponent("Error loading Kalash Yatra data."));
  }
};

// 1. Update Hero Section
exports.postUpdateHero = async (req, res) => {
  try {
    const doc = await KalashYatra.getOrSeed();
    const {
      liveBadgeText,
      headingMain,
      headingHighlight,
      subheading,
      highlights,
      primaryBtnText,
      primaryBtnLink,
      secondaryBtnText,
      secondaryBtnLink,
      stat0_num, stat0_label, stat0_sub,
      stat1_num, stat1_label, stat1_sub,
      stat2_num, stat2_label, stat2_sub,
      stat3_num, stat3_label, stat3_sub,
      featVideo_title,
      featVideo_duration,
      featVideo_videoUrl,
      featVideo_posterImage,
      featVideo_badge,
    } = req.body;

    doc.hero.liveBadgeText = liveBadgeText || doc.hero.liveBadgeText;
    doc.hero.headingMain = headingMain || doc.hero.headingMain;
    doc.hero.headingHighlight = headingHighlight || doc.hero.headingHighlight;
    doc.hero.subheading = subheading || doc.hero.subheading;
    doc.hero.primaryBtnText = primaryBtnText || doc.hero.primaryBtnText;
    doc.hero.primaryBtnLink = primaryBtnLink || doc.hero.primaryBtnLink;
    doc.hero.secondaryBtnText = secondaryBtnText || doc.hero.secondaryBtnText;
    doc.hero.secondaryBtnLink = secondaryBtnLink || doc.hero.secondaryBtnLink;

    if (highlights) {
      doc.hero.highlights = (Array.isArray(highlights) ? highlights : highlights.split("\n"))
        .map((h) => h.trim())
        .filter(Boolean);
    }

    doc.hero.stats = [
      { number: stat0_num || "150+", label: stat0_label || "Districts Reached", sub: stat0_sub || "Sacred Pledge Journey" },
      { number: stat1_num || "50,000+", label: stat1_label || "Auspicious Kalash Worship", sub: stat1_sub || "Vedic Rituals" },
      { number: stat2_num || "10,000+", label: stat2_label || "Women Leadership", sub: stat2_sub || "Leading the Forefront" },
      { number: stat3_num || "28+", label: stat3_label || "States Awakened", sub: stat3_sub || "National Campaign" },
    ];

    doc.hero.featuredVideo = {
      title: featVideo_title || doc.hero.featuredVideo.title,
      duration: featVideo_duration || doc.hero.featuredVideo.duration,
      videoUrl: featVideo_videoUrl || doc.hero.featuredVideo.videoUrl,
      posterImage: featVideo_posterImage || doc.hero.featuredVideo.posterImage,
      badge: featVideo_badge || doc.hero.featuredVideo.badge,
    };

    await doc.save();

    await AdminActivityLog.record({
      req,
      section: "Hero Section (मुख्य हेडर)",
      action: "Hero Section विवरण व आंकड़े अपडेट किए गए",
      details: `मुख्य शीर्षक: "${doc.hero.headingMain}", हाइलाइट: "${doc.hero.headingHighlight}"`,
    });

    res.redirect("/admin/kalash-yatra?tab=hero&msg=" + encodeURIComponent("Hero section successfully updated."));
  } catch (error) {
    console.error("Update Hero error:", error);
    res.redirect("/admin/kalash-yatra?tab=hero&err=" + encodeURIComponent(error.message));
  }
};

// 2. Update Milestones Showcase
exports.postUpdateMilestones = async (req, res) => {
  try {
    const doc = await KalashYatra.getOrSeed();
    const { kicker, title, titleHighlight, subtitle, milestones } = req.body;

    doc.milestonesSection.kicker = kicker || doc.milestonesSection.kicker;
    doc.milestonesSection.title = title || doc.milestonesSection.title;
    doc.milestonesSection.titleHighlight = titleHighlight || doc.milestonesSection.titleHighlight;
    doc.milestonesSection.subtitle = subtitle || doc.milestonesSection.subtitle;

    if (milestones && Array.isArray(milestones)) {
      doc.milestonesSection.items = milestones.map((m, idx) => ({
        stateKey: m.stateKey || "bihar",
        stateName: m.stateName || "",
        district: m.district || "",
        title: m.title || "",
        image: m.image || "",
        description: m.description || "",
        tag: m.tag || "",
        videoUrl: m.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ",
        order: idx + 1,
      }));
    }

    await doc.save();

    await AdminActivityLog.record({
      req,
      section: "5 मुख्य पड़ाव (Milestones)",
      action: "यात्रा के 5 मुख्य पड़ाव / स्टॉप्स अपडेट किए गए",
      details: `शीर्षक: "${doc.milestonesSection.title}", कुल स्टॉप्स: ${(milestones || []).length}`,
    });

    res.redirect("/admin/kalash-yatra?tab=milestones&msg=" + encodeURIComponent("Yatra milestones (5 stops) successfully updated."));
  } catch (error) {
    console.error("Update Milestones error:", error);
    res.redirect("/admin/kalash-yatra?tab=milestones&err=" + encodeURIComponent(error.message));
  }
};

// Helper to extract YouTube video ID from various URL formats
function getYouTubeId(url) {
  if (!url || typeof url !== "string") return "";
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([\w-]{11})/);
  return match ? match[1] : "";
}

// Helper to resolve an effective thumbnail URL
function resolveVideoThumbnail(thumbnail, videoUrl, fallback = "/images/kalash-yatra-hero.jpg") {
  if (thumbnail && thumbnail.trim() && !thumbnail.includes("/images/kalash-yatra-hero.jpg")) {
    return thumbnail.trim();
  }
  const ytId = getYouTubeId(videoUrl);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }
  return thumbnail && thumbnail.trim() ? thumbnail.trim() : fallback;
}

// 3. Add Video to Gallery
exports.postAddVideo = async (req, res) => {
  try {
    const doc = await KalashYatra.getOrSeed();
    const {
      title,
      videoUrl,
      peopleCount,
      thumbnail,
      personOrPlace,
      category,
      state,
      district,
      duration,
      viewsCount,
      date,
      description,
      tag,
    } = req.body;

    let finalVideoUrl = videoUrl ? videoUrl.trim() : "";
    let finalThumbnail = thumbnail ? thumbnail.trim() : "";

    // Check if video file was manually uploaded
    if (req.files && req.files.videoFile && req.files.videoFile[0]) {
      finalVideoUrl = "/uploads/videos/" + req.files.videoFile[0].filename;
    }

    // Check if thumbnail file was manually uploaded
    if (req.files && req.files.thumbnailFile && req.files.thumbnailFile[0]) {
      finalThumbnail = "/uploads/videos/" + req.files.thumbnailFile[0].filename;
    } else if (!finalThumbnail) {
      // Auto-resolve YouTube thumbnail if not provided
      const autoYtThumb = resolveVideoThumbnail("", finalVideoUrl, "");
      if (autoYtThumb) {
        finalThumbnail = autoYtThumb;
      }
    }

    if (!title || !finalVideoUrl) {
      return res.redirect(
        "/admin/kalash-yatra?tab=videos&err=" +
          encodeURIComponent("वीडियो शीर्षक और URL या वीडियो फ़ाइल आवश्यक है।")
      );
    }

    const formattedPeopleCount = peopleCount && peopleCount.trim() ? peopleCount.trim() : "5,000+ लोग";

    const isHighlighted =
      req.body.isHighlighted === "on" ||
      req.body.isHighlighted === "true" ||
      req.body.isHighlighted === true;

    if (isHighlighted && doc.videos) {
      doc.videos.forEach((v) => {
        v.isHighlighted = false;
      });
      doc.hero.featuredVideo = {
        title: title.trim(),
        duration: duration || "12:00 Min",
        videoUrl: finalVideoUrl,
        posterImage: resolveVideoThumbnail(finalThumbnail, finalVideoUrl),
        badge: "★ मुख्य संकल्प वीडियो",
      };
    }

    doc.videos.unshift({
      title: title.trim(),
      videoUrl: finalVideoUrl,
      thumbnail: finalThumbnail,
      peopleCount: formattedPeopleCount,
      personOrPlace: personOrPlace ? personOrPlace.trim() : formattedPeopleCount,
      category: category || "yatra",
      state: state || "bihar",
      district: district ? district.trim() : "गोपालगंज",
      duration: duration || "12:00 Min",
      viewsCount: viewsCount || "10K",
      date: date || new Date().toLocaleDateString("en-US"),
      description: description || "",
      tag: tag || (category === "speech" ? "संबोधन" : category === "program" ? "जन-जागरण" : "संकल्प यात्रा"),
      order: doc.videos.length + 1,
      isHighlighted: isHighlighted,
    });

    await doc.save();

    await AdminActivityLog.record({
      req,
      section: "वीडियो गैलरी (Videos)",
      action: isHighlighted ? "नया वीडियो जोड़ा गया और होम पेज पर हाइलाइट किया गया" : "नया वीडियो जोड़ा गया",
      details: `शीर्षक: "${title.trim()}", उपस्थित जनसमूह: "${formattedPeopleCount}", ज़िला: "${district || 'गोपालगंज'}"${isHighlighted ? ' [होम पेज मुख्य वीडियो]' : ''}`,
    });

    res.redirect("/admin/kalash-yatra?tab=videos&msg=" + encodeURIComponent("नया वीडियो सफलतापूर्वक जोड़ दिया गया।"));
  } catch (error) {
    console.error("Add Video error:", error);
    res.redirect("/admin/kalash-yatra?tab=videos&err=" + encodeURIComponent(error.message));
  }
};

// 4. Update Video in Gallery
exports.postUpdateVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const doc = await KalashYatra.getOrSeed();
    const video = doc.videos.id(videoId);

    if (!video) {
      return res.redirect("/admin/kalash-yatra?tab=videos&err=" + encodeURIComponent("वीडियो नहीं मिला।"));
    }

    const {
      title,
      videoUrl,
      peopleCount,
      thumbnail,
      personOrPlace,
      category,
      state,
      district,
      duration,
      viewsCount,
      date,
      description,
      tag,
      isHighlighted,
    } = req.body;

    video.title = title ? title.trim() : video.title;

    // Handle manual video file upload if provided
    if (req.files && req.files.videoFile && req.files.videoFile[0]) {
      video.videoUrl = "/uploads/videos/" + req.files.videoFile[0].filename;
    } else if (videoUrl && videoUrl.trim()) {
      video.videoUrl = videoUrl.trim();
    }

    // Handle manual thumbnail upload or URL update
    if (req.files && req.files.thumbnailFile && req.files.thumbnailFile[0]) {
      video.thumbnail = "/uploads/videos/" + req.files.thumbnailFile[0].filename;
    } else if (typeof thumbnail !== "undefined") {
      const trimmedThumb = thumbnail.trim();
      if (trimmedThumb) {
        video.thumbnail = trimmedThumb;
      } else {
        // If left empty, auto-detect YouTube thumbnail if applicable
        const ytId = getYouTubeId(video.videoUrl);
        video.thumbnail = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : "";
      }
    }

    if (typeof peopleCount !== "undefined") {
      video.peopleCount = peopleCount.trim();
    }
    if (typeof personOrPlace !== "undefined") {
      video.personOrPlace = personOrPlace.trim();
    }
    video.category = category || video.category;
    video.state = state || video.state;
    video.district = district ? district.trim() : video.district;
    video.duration = duration || video.duration;
    video.viewsCount = viewsCount || video.viewsCount;
    video.date = date || video.date;
    video.description = description || video.description;
    video.tag = tag || video.tag;

    const shouldHighlight =
      isHighlighted === "on" || isHighlighted === "true" || isHighlighted === true;

    if (shouldHighlight) {
      doc.videos.forEach((v) => {
        v.isHighlighted = v._id.toString() === videoId;
      });
      video.isHighlighted = true;
    } else if (typeof isHighlighted !== "undefined") {
      video.isHighlighted = false;
    }

    // Keep doc.hero.featuredVideo fully in sync if this video is currently highlighted
    if (video.isHighlighted) {
      doc.hero.featuredVideo = {
        title: video.title,
        duration: video.duration || "12:00 Min",
        videoUrl: video.videoUrl,
        posterImage: resolveVideoThumbnail(video.thumbnail, video.videoUrl),
        badge: "★ मुख्य संकल्प वीडियो",
      };
    }

    await doc.save();

    await AdminActivityLog.record({
      req,
      section: "वीडियो गैलरी (Videos)",
      action: "वीडियो विवरण संपादित किया गया (Edited)",
      details: `शीर्षक: "${video.title}", उपस्थित जनसमूह: "${video.peopleCount || '—'}", ज़िला: "${video.district || '—'}"${video.isHighlighted ? ' [होम पेज मुख्य वीडियो]' : ''}`,
    });

    res.redirect("/admin/kalash-yatra?tab=videos&msg=" + encodeURIComponent("वीडियो सफलतापूर्वक अपडेट किया गया।"));
  } catch (error) {
    console.error("Update Video error:", error);
    res.redirect("/admin/kalash-yatra?tab=videos&err=" + encodeURIComponent(error.message));
  }
};

// 4b. Highlight Video for Home Page Showcase
exports.postHighlightVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const doc = await KalashYatra.getOrSeed();
    const video = doc.videos.id(videoId);

    if (!video) {
      return res.redirect("/admin/kalash-yatra?tab=videos&err=" + encodeURIComponent("वीडियो नहीं मिला।"));
    }

    // Unset highlight for all videos, set for this one
    doc.videos.forEach((v) => {
      v.isHighlighted = v._id.toString() === videoId;
    });

    const effectivePoster = resolveVideoThumbnail(video.thumbnail, video.videoUrl);
    if (!video.thumbnail && effectivePoster) {
      video.thumbnail = effectivePoster;
    }

    // Also update doc.hero.featuredVideo so all featured references stay in sync!
    doc.hero.featuredVideo = {
      title: video.title,
      duration: video.duration || "12:30 Min",
      videoUrl: video.videoUrl,
      posterImage: effectivePoster,
      badge: "★ मुख्य संकल्प वीडियो",
    };

    await doc.save();

    await AdminActivityLog.record({
      req,
      section: "वीडियो गैलरी (Videos)",
      action: "मुख्य होम पेज वीडियो हाइलाइट किया गया (Highlight Video)",
      details: `वीडियो "${video.title}" को होम पेज पर मुख्य वीडियो के रूप में सेट किया गया।`,
    });

    res.redirect(
      "/admin/kalash-yatra?tab=videos&msg=" +
        encodeURIComponent(`"${video.title.substring(0, 32)}..." को होम पेज पर मुख्य वीडियो बना दिया गया है!`)
    );
  } catch (error) {
    console.error("Highlight Video error:", error);
    res.redirect("/admin/kalash-yatra?tab=videos&err=" + encodeURIComponent(error.message));
  }
};

// 5. Delete Video from Gallery
exports.postDeleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const doc = await KalashYatra.getOrSeed();

    const video = doc.videos.id(videoId);
    const videoTitle = video ? video.title : videoId;

    doc.videos.pull({ _id: videoId });
    await doc.save();

    await AdminActivityLog.record({
      req,
      section: "वीडियो गैलरी (Videos)",
      action: "वीडियो हटाया गया (Deleted)",
      details: `हटाया गया वीडियो: "${videoTitle}" (ID: ${videoId})`,
    });

    res.redirect("/admin/kalash-yatra?tab=videos&msg=" + encodeURIComponent("Video successfully deleted."));
  } catch (error) {
    console.error("Delete Video error:", error);
    res.redirect("/admin/kalash-yatra?tab=videos&err=" + encodeURIComponent(error.message));
  }
};

// 6. Update Pillars Section & Collage Photos
exports.postUpdatePillars = async (req, res) => {
  try {
    const doc = await KalashYatra.getOrSeed();
    const {
      kicker,
      title,
      titleAccent,
      subtitle,
      // Collage
      primaryImage, primaryBadge, primaryTitle, primaryDesc, primaryVideo,
      sub1Image, sub1Tag, sub1Title, sub1Desc, sub1Video,
      sub2Image, sub2Tag, sub2Title, sub2Desc, sub2Video,
      // Pillars
      p0_title, p0_desc,
      p1_title, p1_desc,
      p2_title, p2_desc,
      p3_title, p3_desc,
    } = req.body;

    doc.pillarsSection.kicker = kicker || doc.pillarsSection.kicker;
    doc.pillarsSection.title = title || doc.pillarsSection.title;
    doc.pillarsSection.titleAccent = titleAccent || doc.pillarsSection.titleAccent;
    doc.pillarsSection.subtitle = subtitle || doc.pillarsSection.subtitle;

    // Collage
    doc.pillarsSection.storyCollage.primaryCard = {
      image: primaryImage || doc.pillarsSection.storyCollage.primaryCard.image,
      badge: primaryBadge || doc.pillarsSection.storyCollage.primaryCard.badge,
      title: primaryTitle || doc.pillarsSection.storyCollage.primaryCard.title,
      desc: primaryDesc || doc.pillarsSection.storyCollage.primaryCard.desc,
      videoUrl: primaryVideo || doc.pillarsSection.storyCollage.primaryCard.videoUrl,
    };

    doc.pillarsSection.storyCollage.subCard1 = {
      image: sub1Image || doc.pillarsSection.storyCollage.subCard1.image,
      tag: sub1Tag || doc.pillarsSection.storyCollage.subCard1.tag,
      title: sub1Title || doc.pillarsSection.storyCollage.subCard1.title,
      desc: sub1Desc || doc.pillarsSection.storyCollage.subCard1.desc,
      videoUrl: sub1Video || doc.pillarsSection.storyCollage.subCard1.videoUrl,
    };

    doc.pillarsSection.storyCollage.subCard2 = {
      image: sub2Image || doc.pillarsSection.storyCollage.subCard2.image,
      tag: sub2Tag || doc.pillarsSection.storyCollage.subCard2.tag,
      title: sub2Title || doc.pillarsSection.storyCollage.subCard2.title,
      desc: sub2Desc || doc.pillarsSection.storyCollage.subCard2.desc,
      videoUrl: sub2Video || doc.pillarsSection.storyCollage.subCard2.videoUrl,
    };

    // 4 Pillars
    doc.pillarsSection.pillars = [
      {
        number: "01",
        iconKey: "water",
        title: p0_title || "Sacred Water & Environmental Conservation Pledge",
        description: p0_desc || "",
        order: 1,
      },
      {
        number: "02",
        iconKey: "women",
        title: p1_title || "Pride & Empowerment of Women",
        description: p1_desc || "",
        order: 2,
      },
      {
        number: "03",
        iconKey: "unity",
        title: p2_title || "Social Harmony & Solid Unity",
        description: p2_desc || "",
        order: 3,
      },
      {
        number: "04",
        iconKey: "education",
        title: p3_title || "Path to Education, Values & Self-Reliance",
        description: p3_desc || "",
        order: 4,
      },
    ];

    await doc.save();

    await AdminActivityLog.record({
      req,
      section: "चार मुख्य संकल्प व कोलाज (Pillars)",
      action: "चार प्रमुख संकल्प एवं फोटो कोलाज अपडेट किए गए",
      details: `मुख्य कार्ड शीर्षक: "${doc.pillarsSection.storyCollage.primaryCard.title}"`,
    });

    res.redirect("/admin/kalash-yatra?tab=pillars&msg=" + encodeURIComponent("Four major pledges and photo collage successfully updated."));
  } catch (error) {
    console.error("Update Pillars error:", error);
    res.redirect("/admin/kalash-yatra?tab=pillars&err=" + encodeURIComponent(error.message));
  }
};

// 7. Update Democratic Pledge (लोकतांत्रिक महा-संकल्प)
exports.postUpdatePledge = async (req, res) => {
  try {
    const doc = await KalashYatra.getOrSeed();
    const {
      enabled,
      badge,
      title,
      subtitle,
      pledgeText,
      signOff,
      points,
      videoUrl,
    } = req.body;

    if (!doc.democraticPledge) {
      doc.democraticPledge = {};
    }

    doc.democraticPledge.enabled = enabled === "on" || enabled === true || enabled === "true";
    doc.democraticPledge.badge = badge ? badge.trim() : "🇮🇳 ऐतिहासिक लोकतांत्रिक महा-संकल्प";
    doc.democraticPledge.title = title ? title.trim() : "लोकतांत्रिक संकल्प पत्र";
    doc.democraticPledge.subtitle = subtitle ? subtitle.trim() : "";
    doc.democraticPledge.pledgeText = pledgeText
      ? pledgeText.trim()
      : "आज हम लोकतांत्रिक संकल्प लेते हैं कि आगामी चुनाव में भाजपा के पक्ष में मतदान नहीं करेंगे तथा अपने विवेक और विचार के आधार पर अपने मताधिकार का प्रयोग करेंगे।";
    doc.democraticPledge.signOff = signOff
      ? signOff.trim()
      : "— समस्त समाज, युवा एवं मातृशक्ति का सामूहिक संकल्प";
    doc.democraticPledge.videoUrl = videoUrl ? videoUrl.trim() : "";

    if (typeof points !== "undefined") {
      doc.democraticPledge.keyPoints = (Array.isArray(points) ? points : points.split("\n"))
        .map((p) => p.trim())
        .filter(Boolean);
    }

    await doc.save();

    await AdminActivityLog.record({
      req,
      section: "लोकतांत्रिक संकल्प पत्र (Democratic Pledge)",
      action: "लोकतांत्रिक महा-संकल्प पत्र अपडेट किया गया",
      details: `शीर्षक: "${doc.democraticPledge.title}", स्थिति: ${doc.democraticPledge.enabled ? "सक्रिय (Active)" : "निष्क्रिय (Disabled)"}`,
    });

    res.redirect(
      "/admin/kalash-yatra?tab=pledge&msg=" +
        encodeURIComponent("लोकतांत्रिक महा-संकल्प पत्र सफलतापूर्वक सहेजा गया।")
    );
  } catch (error) {
    console.error("Update Pledge error:", error);
    res.redirect("/admin/kalash-yatra?tab=pledge&err=" + encodeURIComponent(error.message));
  }
};

