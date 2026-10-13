const mongoose = require("mongoose");

const homeQuickInfoSchema = new mongoose.Schema(
  {
    sidebarTitle: {
      type: String,
      trim: true,
    },
    sidebarSubtitle: {
      type: String,
      trim: true,
    },
    pledgeBoxTitle: {
      type: String,
      trim: true,
    },
    pledgeBoxDesc: {
      type: String,
      trim: true,
    },
    helplineText: {
      type: String,
      trim: true,
    },
    helplineTel: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    sidebarFooterText: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HomeQuickInfo", homeQuickInfoSchema);
