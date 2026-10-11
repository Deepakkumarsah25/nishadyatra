const mongoose = require("mongoose");
require("dotenv").config();
const { getStandardHindiState, getStandardHindiDistrict } = require("../utils/indiaStatesDistricts");
const SankalpPhoto = require("../models/SankalpPhoto");

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB.");
  const photos = await SankalpPhoto.find({});
  console.log("Total photos found:", photos.length);
  for (const photo of photos) {
    const hState = getStandardHindiState(photo.state) || "उत्तर प्रदेश";
    const hDistrict = getStandardHindiDistrict(photo.district) || photo.district;
    const images = (photo.images && photo.images.length > 0)
      ? photo.images
      : [{ url: photo.imageUrl, publicId: photo.imagePublicId || "", caption: photo.caption || "" }];

    photo.state = hState;
    photo.district = hDistrict;
    photo.images = images;
    await photo.save();
    console.log(`Updated photo ${photo._id}: state=${hState}, district=${hDistrict}, images=${images.length}`);
  }
  await mongoose.disconnect();
  console.log("Migration completed.");
}

migrate().catch(console.error);
