const mongoose = require("mongoose");

const sankalpPhotoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "नाम आवश्यक है"],
      trim: true,
      default: "सनातनी निषाद",
    },
    district: {
      type: String,
      required: [true, "जिला आवश्यक है"],
      trim: true,
      index: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    dateString: {
      type: String,
      trim: true,
      default: "",
    },
    caption: {
      type: String,
      trim: true,
      default: "",
    },
    imageUrl: {
      type: String,
      required: [true, "तस्वीर URL अथवा फाइल आवश्यक है"],
      trim: true,
    },
    imageFilename: {
      type: String,
      default: "",
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Formatted date virtual
sankalpPhotoSchema.virtual("formattedDate").get(function () {
  if (this.dateString && this.dateString.trim()) {
    return this.dateString;
  }
  if (!this.date) return "";
  try {
    const d = new Date(this.date);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("hi-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (e) {
    return "";
  }
});

module.exports = mongoose.model("SankalpPhoto", sankalpPhotoSchema);
