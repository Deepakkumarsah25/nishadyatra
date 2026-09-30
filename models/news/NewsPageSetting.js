const mongoose = require("mongoose");

const newsPageSettingSchema = new mongoose.Schema(
  {
    key: { type: String, default: "news-page", unique: true },
    heroPosterPath: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.NewsPageSetting ||
  mongoose.model("NewsPageSetting", newsPageSettingSchema);
