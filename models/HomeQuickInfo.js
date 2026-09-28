const mongoose = require("mongoose");

const homeQuickInfoSchema = new mongoose.Schema(
  {
    sidebarTitle: {
      type: String,
      default: "Nishad Sankalp Campaign",
      trim: true,
    },
    sidebarSubtitle: {
      type: String,
      default: "Quick Service & Support Center",
      trim: true,
    },
    pledgeBoxTitle: {
      type: String,
      default: "Join the Campaign by Taking a Pledge",
      trim: true,
    },
    pledgeBoxDesc: {
      type: String,
      default: "Register your online pledge for the upliftment and empowerment of our community.",
      trim: true,
    },
    helplineText: {
      type: String,
      default: "Helpline: +91 99999 99999",
      trim: true,
    },
    helplineTel: {
      type: String,
      default: "+919999999999",
      trim: true,
    },
    email: {
      type: String,
      default: "info@nishadsankalp.org",
      trim: true,
    },
    sidebarFooterText: {
      type: String,
      default: "Public service is our true pledge",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HomeQuickInfo", homeQuickInfoSchema);
