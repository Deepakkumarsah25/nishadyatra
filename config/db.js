const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI is missing in .env");
    }

    await mongoose.connect(mongoURI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error(error.message);

    process.exit(1);
  }
};

module.exports = connectDB;