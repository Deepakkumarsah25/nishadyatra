const KalashYatra = require("../../models/KalashYatra");

// View Kalash Yatra Manager
exports.getKalashYatraManager = async (req, res) => {
  try {
    const kalash = await KalashYatra.getOrSeed();
    const activeTab = req.query.tab || "hero";

    res.render("admin/kalash-yatra/index", {
      title: "Kalash Yatra Management",
      admin: req.session.admin,
      kalash,
      activeTab,
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
    res.redirect("/admin/kalash-yatra?tab=milestones&msg=" + encodeURIComponent("Yatra milestones (5 stops) successfully updated."));
  } catch (error) {
    console.error("Update Milestones error:", error);
    res.redirect("/admin/kalash-yatra?tab=milestones&err=" + encodeURIComponent(error.message));
  }
};

// 3. Add Video to Gallery
exports.postAddVideo = async (req, res) => {
  try {
    const doc = await KalashYatra.getOrSeed();
    const {
      title,
      videoUrl,
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

    if (!title || !videoUrl) {
      return res.redirect("/admin/kalash-yatra?tab=videos&err=" + encodeURIComponent("Video title and URL are required."));
    }

    doc.videos.unshift({
      title: title.trim(),
      videoUrl: videoUrl.trim(),
      thumbnail: thumbnail ? thumbnail.trim() : "",
      personOrPlace: personOrPlace ? personOrPlace.trim() : "",
      category: category || "yatra",
      state: state || "bihar",
      district: district ? district.trim() : "गोपालगंज",
      duration: duration || "12:00 Min",
      viewsCount: viewsCount || "10K",
      date: date || new Date().toLocaleDateString("en-US"),
      description: description || "",
      tag: tag || (category === "speech" ? "Speech" : category === "program" ? "Program" : "Kalash Yatra"),
      order: doc.videos.length + 1,
    });

    await doc.save();
    res.redirect("/admin/kalash-yatra?tab=videos&msg=" + encodeURIComponent("New video successfully added."));
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
      return res.redirect("/admin/kalash-yatra?tab=videos&err=" + encodeURIComponent("Video not found."));
    }

    const {
      title,
      videoUrl,
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

    video.title = title ? title.trim() : video.title;
    video.videoUrl = videoUrl ? videoUrl.trim() : video.videoUrl;
    if (typeof thumbnail !== "undefined") video.thumbnail = thumbnail.trim();
    if (typeof personOrPlace !== "undefined") video.personOrPlace = personOrPlace.trim();
    video.category = category || video.category;
    video.state = state || video.state;
    video.district = district ? district.trim() : video.district;
    video.duration = duration || video.duration;
    video.viewsCount = viewsCount || video.viewsCount;
    video.date = date || video.date;
    video.description = description || video.description;
    video.tag = tag || video.tag;

    await doc.save();
    res.redirect("/admin/kalash-yatra?tab=videos&msg=" + encodeURIComponent("Video successfully updated."));
  } catch (error) {
    console.error("Update Video error:", error);
    res.redirect("/admin/kalash-yatra?tab=videos&err=" + encodeURIComponent(error.message));
  }
};

// 5. Delete Video from Gallery
exports.postDeleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const doc = await KalashYatra.getOrSeed();

    doc.videos.pull({ _id: videoId });
    await doc.save();

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
    res.redirect(
      "/admin/kalash-yatra?tab=pledge&msg=" +
        encodeURIComponent("लोकतांत्रिक महा-संकल्प पत्र सफलतापूर्वक सहेजा गया।")
    );
  } catch (error) {
    console.error("Update Pledge error:", error);
    res.redirect("/admin/kalash-yatra?tab=pledge&err=" + encodeURIComponent(error.message));
  }
};

