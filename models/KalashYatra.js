const mongoose = require("mongoose");

const defaultKalashYatraData = {
  hero: {
    liveBadgeText: "Sacred Pledge Campaign • National Mega Event",
    headingMain: "Kalash Yatra",
    headingHighlight: "Sacred Confluence of Unity, Culture & Self-Respect",
    subheading:
      "Nurtured by sacred river waters, this mega campaign unites society, inspires cultural consciousness, and sounds the historic call for a self-reliant nation.",
    highlights: [
      "Sacred reverence of Ganga, Saryu, Narmada, and Gandak waters",
      "Unmatched leadership and participation of women",
      "Awakening of social harmony and civic consciousness",
    ],
    primaryBtnText: "Watch Sacred Videos",
    primaryBtnLink: "#videoGallery",
    secondaryBtnText: "Join the Pledge",
    secondaryBtnLink: "#pillarsSection",
    stats: [
      { number: "150+", label: "Districts Reached", sub: "Sacred Pledge Journey" },
      { number: "50,000+", label: "Auspicious Kalash Worship", sub: "Vedic Rituals" },
      { number: "10,000+", label: "Women Leadership", sub: "Leading the Forefront" },
      { number: "28+", label: "States Awakened", sub: "National Campaign" },
    ],
    featuredVideo: {
      title: "Grand Historic Kalash Yatra Inauguration — Mega Event",
      duration: "12:45 Min",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      posterImage: "/images/kalash-yatra-hero.jpg",
      badge: "★ Featured Video",
    },
  },

  milestonesSection: {
    kicker: "★ Special Compilation • Nishad Sankalp Campaign",
    title: "Kalash Yatra — ",
    titleHighlight: "A Sacred Journey of Unity and Commitment",
    subtitle:
      "From Gopalganj to Kashi, Ayodhya, Bhopal, and Ranchi — key milestones across 150+ districts awakening harmony and dignity with sacred river waters.",
    items: [
      {
        stateKey: "bihar",
        stateName: "Bihar",
        district: "Gopalganj",
        title: "Historic Gopalganj Kalash Yatra",
        image: "/images/kalash-yatra-featured.jpg",
        description:
          "Thousands of women carried auspicious kalash on their heads, conveying a divine message of harmony and community awakening.",
        tag: "🚩 Milestone 1",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        order: 1,
      },
      {
        stateKey: "uttar-pradesh",
        stateName: "Uttar Pradesh",
        district: "Varanasi Ghat",
        title: "Ganga Worship on Sacred Ghats of Kashi",
        image: "/images/ghat-kalash-procession.jpg",
        description:
          "Reverence of holy waters with conch sounds and Vedic chants at Dashashwamedh and Assi Ghats.",
        tag: "🌊 Sacred Ganga Reverence",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        order: 2,
      },
      {
        stateKey: "uttar-pradesh",
        stateName: "Uttar Pradesh",
        district: "Ayodhya - Prayagraj",
        title: "Ayodhya-Prayagraj Confluence",
        image: "/images/sacred-kalash-ritual.jpg",
        description:
          "Traditional Vedic installation with mango leaves and sacred coconuts, showcasing magnificent community unity.",
        tag: "🪔 Vedic Ceremony",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        order: 3,
      },
      {
        stateKey: "madhya-pradesh",
        stateName: "Madhya Pradesh",
        district: "Bhopal",
        title: "Bhopal Mega Convention & Public Gathering",
        image: "/images/kalash-yatra-hero.jpg",
        description:
          "Historic gathering of thousands of devotees from Narmadanchal rising for collective self-respect.",
        tag: "🏛️ Mega Convention",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        order: 4,
      },
      {
        stateKey: "jharkhand",
        stateName: "Jharkhand",
        district: "Ranchi",
        title: "Ranchi Sacred Kalash Procession",
        image: "/images/ranchi-kalash-procession.jpg",
        description:
          "Auspicious pledge ceremony along the banks of the Subarnarekha River with extensive tribal and coastal participation.",
        tag: "🌿 Dignity Journey",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        order: 5,
      },
    ],
  },

  videos: [
    {
      title: "Grand Kalash Yatra in Gopalganj — Historic Participation of 5,000+ Women",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "yatra",
      state: "bihar",
      district: "gopalganj",
      duration: "14:20 Min",
      viewsCount: "18.5K",
      date: "January 14, 2024",
      description:
        "People from all sections of society enthusiastically participated in this sacred Kalash Yatra in Gopalganj district amid chanting of Vedic mantras.",
      tag: "Kalash Yatra",
      order: 1,
    },
    {
      title: "Varanasi Dashashwamedh Ghat — Ganga Worship & Sacred Kalash Installation",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "program",
      state: "uttar-pradesh",
      district: "varanasi",
      duration: "18:45 Min",
      viewsCount: "24.1K",
      date: "January 22, 2024",
      description:
        "Divine spectacle of Kalash worship with holy Ganga water in the sacred city of Kashi Vishwanath, celebrating Nishad heritage.",
      tag: "Program",
      order: 2,
    },
    {
      title: "Historic Address on Community Dignity and Unity — Nishad Sankalp Convention",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "speech",
      state: "bihar",
      district: "patna",
      duration: "26:10 Min",
      viewsCount: "32.8K",
      date: "February 05, 2024",
      description:
        "Inspiring speech delivered at the state convention in Patna focusing on education, youth empowerment, and organized collective strength.",
      tag: "Speech",
      order: 3,
    },
    {
      title: "Narmada Water Kalash Yatra in Bhopal — Thousands of Devotees Gather",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "yatra",
      state: "madhya-pradesh",
      district: "bhopal",
      duration: "11:55 Min",
      viewsCount: "12.3K",
      date: "February 18, 2024",
      description:
        "Taking a sacred pledge of social harmony and self-reliance witnessed by the holy waters of Mother Narmada.",
      tag: "Kalash Yatra",
      order: 4,
    },
    {
      title: "Ranchi Subarnarekha Bank — Sacred Kalash Yatra & Social Consciousness Meet",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "program",
      state: "jharkhand",
      district: "ranchi",
      duration: "16:30 Min",
      viewsCount: "15.9K",
      date: "February 28, 2024",
      description:
        "Community delegates from various districts of Jharkhand took solemn oaths for water conservation and cultural unity.",
      tag: "Program",
      order: 5,
    },
    {
      title: "Youth Leadership Dialogue in Lucknow — Pledge for Education & Self-Respect",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "speech",
      state: "uttar-pradesh",
      district: "lucknow",
      duration: "21:05 Min",
      viewsCount: "29.4K",
      date: "March 10, 2024",
      description:
        "Keynote address outlining comprehensive roadmaps to connect the new generation with higher education and administrative services.",
      tag: "Speech",
      order: 6,
    },
  ],

  pillarsSection: {
    kicker: "Sacred Heritage & Social Awakening • Major Pledges Showcase",
    title: "Four Major Pledges of Kalash Yatra — ",
    titleAccent: "Faith, Culture and Self-Respect",
    subtitle:
      "A sacred movement for social harmony, women's empowerment, and a bright future for coming generations. Discover the core values of this campaign.",
    storyCollage: {
      primaryCard: {
        image: "/images/ghat-kalash-procession.jpg",
        badge: "Confluence of Ganga & Sacred Rivers",
        title: "Water Purification & Cultural Renaissance",
        desc: "Divine sight of women performing Kalash worship with Vedic chants at sunrise on sacred river banks.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      subCard1: {
        image: "/images/sacred-kalash-ritual.jpg",
        tag: "🪔 Vedic Ceremony",
        title: "Auspicious Kalash Installation",
        desc: "Mango leaves, coconut and sacred water",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      subCard2: {
        image: "/images/kalash-yatra-featured.jpg",
        tag: "🚩 Historic Rally",
        title: "Call for Dignity & Unity",
        desc: "Unity across 150+ districts",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
    },
    pillars: [
      {
        number: "01",
        iconKey: "water",
        title: "Sacred Water & Environmental Conservation Pledge",
        description:
          "Witnessed by sacred rivers like Ganga, Saryu, Narmada and Gandak, taking a collective vow for clean water sources and ecological balance.",
        order: 1,
      },
      {
        number: "02",
        iconKey: "women",
        title: "Pride & Empowerment of Women",
        description:
          "Frontline leadership of mothers, sisters, and daughters in the Kalash Yatra, embodying womanhood's vital role in social leadership.",
        order: 2,
      },
      {
        number: "03",
        iconKey: "unity",
        title: "Social Harmony & Solid Unity",
        description:
          "Transcending boundaries of villages, towns, and states to unite every section into a single fabric of brotherhood and collective strength.",
        order: 3,
      },
      {
        number: "04",
        iconKey: "education",
        title: "Path to Education, Values & Self-Reliance",
        description:
          "Connecting the youth to their proud historical legacy, promoting higher education, and building a self-reliant community.",
        order: 4,
      },
    ],
  },
};

const kalashYatraSchema = new mongoose.Schema(
  {
    hero: {
      liveBadgeText: { type: String, default: defaultKalashYatraData.hero.liveBadgeText },
      headingMain: { type: String, default: defaultKalashYatraData.hero.headingMain },
      headingHighlight: { type: String, default: defaultKalashYatraData.hero.headingHighlight },
      subheading: { type: String, default: defaultKalashYatraData.hero.subheading },
      highlights: [{ type: String }],
      primaryBtnText: { type: String, default: defaultKalashYatraData.hero.primaryBtnText },
      primaryBtnLink: { type: String, default: defaultKalashYatraData.hero.primaryBtnLink },
      secondaryBtnText: { type: String, default: defaultKalashYatraData.hero.secondaryBtnText },
      secondaryBtnLink: { type: String, default: defaultKalashYatraData.hero.secondaryBtnLink },
      stats: [
        {
          number: { type: String, default: "" },
          label: { type: String, default: "" },
          sub: { type: String, default: "" },
        },
      ],
      featuredVideo: {
        title: { type: String, default: defaultKalashYatraData.hero.featuredVideo.title },
        duration: { type: String, default: defaultKalashYatraData.hero.featuredVideo.duration },
        videoUrl: { type: String, default: defaultKalashYatraData.hero.featuredVideo.videoUrl },
        posterImage: { type: String, default: defaultKalashYatraData.hero.featuredVideo.posterImage },
        badge: { type: String, default: defaultKalashYatraData.hero.featuredVideo.badge },
      },
    },

    milestonesSection: {
      kicker: { type: String, default: defaultKalashYatraData.milestonesSection.kicker },
      title: { type: String, default: defaultKalashYatraData.milestonesSection.title },
      titleHighlight: { type: String, default: defaultKalashYatraData.milestonesSection.titleHighlight },
      subtitle: { type: String, default: defaultKalashYatraData.milestonesSection.subtitle },
      items: [
        {
          stateKey: { type: String, default: "bihar" },
          stateName: { type: String, default: "" },
          district: { type: String, default: "" },
          title: { type: String, default: "" },
          image: { type: String, default: "" },
          description: { type: String, default: "" },
          tag: { type: String, default: "" },
          videoUrl: { type: String, default: "" },
          order: { type: Number, default: 0 },
        },
      ],
    },

    videos: [
      {
        title: { type: String, required: true },
        videoUrl: { type: String, required: true },
        category: {
          type: String,
          enum: ["all", "yatra", "program", "speech"],
          default: "yatra",
        },
        state: { type: String, default: "bihar" },
        district: { type: String, default: "" },
        duration: { type: String, default: "10:00 Min" },
        viewsCount: { type: String, default: "10K" },
        date: { type: String, default: "" },
        description: { type: String, default: "" },
        tag: { type: String, default: "Kalash Yatra" },
        order: { type: Number, default: 0 },
      },
    ],

    pillarsSection: {
      kicker: { type: String, default: defaultKalashYatraData.pillarsSection.kicker },
      title: { type: String, default: defaultKalashYatraData.pillarsSection.title },
      titleAccent: { type: String, default: defaultKalashYatraData.pillarsSection.titleAccent },
      subtitle: { type: String, default: defaultKalashYatraData.pillarsSection.subtitle },
      storyCollage: {
        primaryCard: {
          image: { type: String, default: "" },
          badge: { type: String, default: "" },
          title: { type: String, default: "" },
          desc: { type: String, default: "" },
          videoUrl: { type: String, default: "" },
        },
        subCard1: {
          image: { type: String, default: "" },
          tag: { type: String, default: "" },
          title: { type: String, default: "" },
          desc: { type: String, default: "" },
          videoUrl: { type: String, default: "" },
        },
        subCard2: {
          image: { type: String, default: "" },
          tag: { type: String, default: "" },
          title: { type: String, default: "" },
          desc: { type: String, default: "" },
          videoUrl: { type: String, default: "" },
        },
      },
      pillars: [
        {
          number: { type: String, default: "" },
          iconKey: { type: String, default: "water" },
          title: { type: String, default: "" },
          description: { type: String, default: "" },
          order: { type: Number, default: 0 },
        },
      ],
    },
  },
  { timestamps: true }
);

// Static helper to get existing doc or seed if empty
kalashYatraSchema.statics.getOrSeed = async function () {
  let doc = await this.findOne();
  if (!doc) {
    doc = await this.create(defaultKalashYatraData);
  }
  return doc;
};

kalashYatraSchema.statics.defaultData = defaultKalashYatraData;

module.exports = mongoose.model("KalashYatra", kalashYatraSchema);
