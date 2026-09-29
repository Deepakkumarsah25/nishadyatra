const mongoose = require("mongoose");

const trustPillarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  iconKey: {
    type: String,
    default: "shield",
    trim: true,
  },
  order: {
    type: Number,
    default: 0,
  },
});

const whyChooseSchema = new mongoose.Schema(
  {
    sectionTag: {
      type: String,
      default: "Transparency & Commitment",
      trim: true,
    },
    sectionTitle: {
      type: String,
      default: "Why Choose the",
      trim: true,
    },
    highlightText: {
      type: String,
      default: "Nishad Sankalp Campaign?",
      trim: true,
    },
    sectionSubtitle: {
      type: String,
      default:
        "Our objective is not political ambition, but ensuring that education, self-respect, legal protection, and economic progress reach the last person in society.",
      trim: true,
    },
    introHeading: {
      type: String,
      default: "A Foundation Built on Ground Realities & Unwavering Dedication",
      trim: true,
    },
    introDesc: {
      type: String,
      default:
        "Through relentless struggle and dedicated public service, we have earned the lasting trust of our community. Standing by your side at every step is our highest calling.",
      trim: true,
    },
    pillars: {
      type: [trustPillarSchema],
      default: [],
    },
    quoteText: {
      type: String,
      default:
        "When each hand in the community joins together in purpose, the course of history transforms. Nishad Sankalp Campaign is your voice.",
      trim: true,
    },
    pledgePoints: {
      type: [String],
      default: [
        "Free membership and transparent community participation",
        "Direct outreach meetings at the village and block levels",
        "Personalized guidance and mentorship for students and youth",
        "Immediate volunteer response teams during crises and emergencies",
      ],
    },
    pledgeBtnText: {
      type: String,
      default: "Take the Pledge Today",
      trim: true,
    },
    pledgeBtnLink: {
      type: String,
      default: "#quickActionSidebar",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WhyChoose", whyChooseSchema);
