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
      trim: true,
    },
    sectionTitle: {
      type: String,
      trim: true,
    },
    highlightText: {
      type: String,
      trim: true,
    },
    sectionSubtitle: {
      type: String,
      trim: true,
    },
    introHeading: {
      type: String,
      trim: true,
    },
    introDesc: {
      type: String,
      trim: true,
    },
    pillars: {
      type: [trustPillarSchema],
      default: [],
    },
    quoteText: {
      type: String,
      trim: true,
    },
    pledgePoints: {
      type: [String],
    },
    pledgeBtnText: {
      type: String,
      trim: true,
    },
    pledgeBtnLink: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WhyChoose", whyChooseSchema);
