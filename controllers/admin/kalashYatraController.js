const KalashYatra = require("../../models/KalashYatra");

// View Kalash Yatra Manager
exports.getKalashYatraManager = async (req, res) => {
  try {
    const kalash = await KalashYatra.getOrSeed();
    const activeTab = req.query.tab || "hero";

    res.render("admin/kalash-yatra/index", {
      title: "कलश यात्रा प्रबंधन (Kalash Yatra Manager)",
      admin: req.session.admin,
      kalash,
      activeTab,
      currentPath: "/admin/kalash-yatra",
      message: req.query.msg || null,
      error: req.query.err || null,
    });
  } catch (error) {
    console.error("Fetch Kalash Yatra manager error:", error);
    res.status(500).redirect("/admin/dashboard?err=" + encodeURIComponent("कलश यात्रा डेटा लोड करने में त्रुटि आई।"));
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
      { number: stat0_num || "150+", label: stat0_label || "जिलों में विस्तार", sub: stat0_sub || "पवित्र संकल्प यात्रा" },
      { number: stat1_num || "50,000+", label: stat1_label || "मंगल कलश पूजन", sub: stat1_sub || "वैदिक विधि-विधान" },
      { number: stat2_num || "10,000+", label: stat2_label || "मातृशक्ति सहभागिता", sub: stat2_sub || "अग्रिम पंक्ति में" },
      { number: stat3_num || "28+", label: stat3_label || "राज्यों में चेतना", sub: stat3_sub || "अखंड राष्ट्रीय अभियान" },
    ];

    doc.hero.featuredVideo = {
      title: featVideo_title || doc.hero.featuredVideo.title,
      duration: featVideo_duration || doc.hero.featuredVideo.duration,
      videoUrl: featVideo_videoUrl || doc.hero.featuredVideo.videoUrl,
      posterImage: featVideo_posterImage || doc.hero.featuredVideo.posterImage,
      badge: featVideo_badge || doc.hero.featuredVideo.badge,
    };

    await doc.save();
    res.redirect("/admin/kalash-yatra?tab=hero&msg=" + encodeURIComponent("हीरो सेक्शन सफलतापूर्वक अपडेट हो गया।"));
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
    res.redirect("/admin/kalash-yatra?tab=milestones&msg=" + encodeURIComponent("यात्रा पड़ाव (5 माइलस्टोन्स) सफलतापूर्वक अपडेट हो गए।"));
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
      return res.redirect("/admin/kalash-yatra?tab=videos&err=" + encodeURIComponent("वीडियो शीर्षक और URL आवश्यक हैं।"));
    }

    doc.videos.unshift({
      title: title.trim(),
      videoUrl: videoUrl.trim(),
      category: category || "yatra",
      state: state || "bihar",
      district: district ? district.trim().toLowerCase() : "gopalganj",
      duration: duration || "12:00 Min",
      viewsCount: viewsCount || "10K",
      date: date || new Date().toLocaleDateString("hi-IN"),
      description: description || "",
      tag: tag || (category === "speech" ? "संबोधन" : category === "program" ? "कार्यक्रम" : "कलश यात्रा"),
      order: doc.videos.length + 1,
    });

    await doc.save();
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
      category,
      state,
      district,
      duration,
      viewsCount,
      date,
      description,
      tag,
    } = req.body;

    video.title = title || video.title;
    video.videoUrl = videoUrl || video.videoUrl;
    video.category = category || video.category;
    video.state = state || video.state;
    video.district = district ? district.trim().toLowerCase() : video.district;
    video.duration = duration || video.duration;
    video.viewsCount = viewsCount || video.viewsCount;
    video.date = date || video.date;
    video.description = description || video.description;
    video.tag = tag || video.tag;

    await doc.save();
    res.redirect("/admin/kalash-yatra?tab=videos&msg=" + encodeURIComponent("वीडियो सफलतापूर्वक अपडेट किया गया।"));
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

    res.redirect("/admin/kalash-yatra?tab=videos&msg=" + encodeURIComponent("वीडियो सफलतापूर्वक हटा दिया गया।"));
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
        title: p0_title || "पवित्र जल एवं पर्यावरण संरक्षण संकल्प",
        description: p0_desc || "",
        order: 1,
      },
      {
        number: "02",
        iconKey: "women",
        title: p1_title || "मातृशक्ति का गौरव एवं सशक्तिकरण",
        description: p1_desc || "",
        order: 2,
      },
      {
        number: "03",
        iconKey: "unity",
        title: p2_title || "सामाजिक समरसता व अखंड एकजुटता",
        description: p2_desc || "",
        order: 3,
      },
      {
        number: "04",
        iconKey: "education",
        title: p3_title || "शिक्षा, संस्कार और स्वावलंबन की राह",
        description: p3_desc || "",
        order: 4,
      },
    ];

    await doc.save();
    res.redirect("/admin/kalash-yatra?tab=pillars&msg=" + encodeURIComponent("चार महा-संकल्प व फ़ोटो कोलाज सफलतापूर्वक अपडेट हो गए।"));
  } catch (error) {
    console.error("Update Pillars error:", error);
    res.redirect("/admin/kalash-yatra?tab=pillars&err=" + encodeURIComponent(error.message));
  }
};
