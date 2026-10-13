const mongoose = require("mongoose");

const pointItemSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  icon: { type: String, default: "" },
  order: { type: Number, default: 0 },
});

const timelineItemSchema = new mongoose.Schema({
  year: { type: String, default: "" },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  order: { type: Number, default: 0 },
});

const demandItemSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  order: { type: Number, default: 0 },
});

const activityItemSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  date: { type: String, default: "" },
  order: { type: Number, default: 0 },
});

const messageItemSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  role: { type: String, default: "" },
  message: { type: String, default: "" },
  image: { type: String, default: "" },
  order: { type: Number, default: 0 },
});

const galleryPhotoSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  caption: { type: String, default: "" },
  category: { type: String, default: "सामान्य" },
  imageUrl: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const statItemSchema = new mongoose.Schema({
  number: { type: String, default: "" },
  label: { type: String, default: "" },
  sub: { type: String, default: "" },
});

const aboutPageSchema = new mongoose.Schema(
  {
    isPublished: { type: Boolean, default: true },

    meta: {
      pageTitle: { type: String,  },
      pageSubtitle: { type: String,  },
      heroBadge: { type: String,  },
      heroImage: { type: String,  },
      stats: [statItemSchema],
    },

    objective: {
      navTitle: { type: String,  },
      title: { type: String,  },
      tagline: { type: String,  },
      description: { type: String,  },
      points: [pointItemSchema],
      keyQuote: { type: String,  },
      image: { type: String,  },
    },

    mission: {
      navTitle: { type: String,  },
      title: { type: String,  },
      tagline: { type: String,  },
      description: { type: String,  },
      pillars: [pointItemSchema],
      targetYears: { type: String,  },
      image: { type: String,  },
    },

    vision: {
      navTitle: { type: String,  },
      title: { type: String,  },
      tagline: { type: String,  },
      description: { type: String,  },
      visionPoints: [pointItemSchema],
      quote: { type: String,  },
      image: { type: String,  },
    },

    background: {
      navTitle: { type: String,  },
      title: { type: String,  },
      tagline: { type: String,  },
      description: { type: String,  },
      historicalLegacy: { type: String,  },
      timeline: [timelineItemSchema],
      image: { type: String,  },
    },

    reservation: {
      navTitle: { type: String,  },
      title: { type: String,  },
      tagline: { type: String,  },
      description: { type: String,  },
      legalBasis: { type: String,  },
      keyDemands: [demandItemSchema],
      actionPlan: { type: String,  },
      image: { type: String,  },
    },

    activities: {
      navTitle: { type: String,  },
      title: { type: String,  },
      tagline: { type: String,  },
      description: { type: String,  },
      detailTitle: { type: String,  },
      detailDescription: { type: String,  },
      detailPoints: [pointItemSchema],
      activityList: [activityItemSchema],
      image: { type: String,  },
    },

    messages: {
      navTitle: { type: String,  },
      title: { type: String,  },
      tagline: { type: String,  },
      description: { type: String,  },
      messagesList: [messageItemSchema],
      image: { type: String,  },
    },

    gallery: {
      title: { type: String,  },
      tagline: { type: String,  },
      photos: [galleryPhotoSchema],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AboutPage", aboutPageSchema);
