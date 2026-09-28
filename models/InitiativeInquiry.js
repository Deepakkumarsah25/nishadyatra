const mongoose = require("mongoose");

const initiativeInquirySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["pledge", "initiative"],
      default: "initiative",
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      default: "",
      trim: true,
    },
    message: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "completed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("InitiativeInquiry", initiativeInquirySchema);
