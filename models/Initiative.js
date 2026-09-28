const mongoose = require("mongoose");

const initiativeSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    cardTag: {
      type: String,
      required: true,
      trim: true,
    },
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
    points: {
      type: [String],
      default: [],
    },
    btnText: {
      type: String,
      default: "Support or Join",
      trim: true,
    },
    modalTag: {
      type: String,
      default: "",
      trim: true,
    },
    modalTitle: {
      type: String,
      default: "",
      trim: true,
    },
    modalDescription: {
      type: String,
      default: "",
      trim: true,
    },
    modalHighlights: {
      type: [String],
      default: [],
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
    formTitle: {
      type: String,
      default: "Registration for Support & Assistance",
      trim: true,
    },
    formSubmitText: {
      type: String,
      default: "Send Support Request",
      trim: true,
    },
    iconKey: {
      type: String,
      default: "scale",
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Initiative", initiativeSchema);
