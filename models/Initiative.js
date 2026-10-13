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
            trim: true,
    },
    helplineTel: {
      type: String,
            trim: true,
    },
    formTitle: {
      type: String,
            trim: true,
    },
    formSubmitText: {
      type: String,
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
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

initiativeSchema.index({ order: 1, createdAt: 1 });

module.exports = mongoose.model("Initiative", initiativeSchema);
