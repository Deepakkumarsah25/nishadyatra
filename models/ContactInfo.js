const mongoose = require("mongoose");

const defaultContactData = {
  pageBadge: "॥ जय निषादराज ॥ सीधा संवाद एवं सहयोग केंद्र",
  pageHeading: "हमसे संपर्क करें",
  pageSubheading: "निषाद संकल्प अभियान से जुड़ने, सुझाव देने या किसी भी सहयोग एवं जानकारी के लिए हमसे निसंकोच संपर्क करें।",
  officeTitle: "कार्यालय का पता",
  officeAddress: "निषाद संकल्प अभियान भवन, निकट सरयू तट मार्ग, अयोध्या / लखनऊ, उत्तर प्रदेश",
  officeTiming: "सोमवार से शनिवार: प्रातः 10:00 बजे से सायं 06:00 बजे तक (रविवार अवकाश)",
  mapDirectionsUrl: "https://maps.google.com/?q=Ayodhya,Uttar+Pradesh",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114000!2d82.15!3d26.79!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a07937e6d271b%3A0x66c88863f8e5f!2sAyodhya%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000",
  primaryPhone: "+91 99553 09029",
  secondaryPhone: "+91 99553 09029",
  primaryEmail: "nishadaarakshansankalp@gmail.com",
  secondaryEmail: "nishadaarakshansankalp@gmail.com",
  whatsappNumber: "+919955309029",
  whatsappMessage: "नमस्ते, मैं निषाद संकल्प अभियान से संपर्क करना चाहता हूँ।",
  facebookUrl: "https://facebook.com/nishadsankalp",
  twitterUrl: "https://twitter.com/nishadsankalp",
  instagramUrl: "https://instagram.com/nishadsankalp",
  youtubeUrl: "https://youtube.com/@nishadsankalp",
  telegramUrl: "https://t.me/nishadsankalp",
  bannerImage: "/images/contact-banner.jpg",
  heroChip1: "त्वरित प्रतिक्रिया",
  heroChip2: "सीधी हेल्पलाइन",
  heroChip3: "मुख्यालय उपस्थिति",
};

const contactInfoSchema = new mongoose.Schema(
  {
    bannerImage: {
      type: String,
      default: defaultContactData.bannerImage,
      trim: true,
    },
    bannerImagePublicId: {
      type: String,
      default: "",
      trim: true,
    },
    pageBadge: {
      type: String,
      default: defaultContactData.pageBadge,
      trim: true,
    },
    pageHeading: {
      type: String,
      default: defaultContactData.pageHeading,
      trim: true,
    },
    pageSubheading: {
      type: String,
      default: defaultContactData.pageSubheading,
      trim: true,
    },
    heroChip1: {
      type: String,
      default: defaultContactData.heroChip1,
      trim: true,
    },
    heroChip2: {
      type: String,
      default: defaultContactData.heroChip2,
      trim: true,
    },
    heroChip3: {
      type: String,
      default: defaultContactData.heroChip3,
      trim: true,
    },
    officeTitle: {
      type: String,
      default: defaultContactData.officeTitle,
      trim: true,
    },
    officeAddress: {
      type: String,
      default: defaultContactData.officeAddress,
      trim: true,
    },
    officeTiming: {
      type: String,
      default: defaultContactData.officeTiming,
      trim: true,
    },
    mapDirectionsUrl: {
      type: String,
      default: defaultContactData.mapDirectionsUrl,
      trim: true,
    },
    mapEmbedUrl: {
      type: String,
      default: defaultContactData.mapEmbedUrl,
      trim: true,
    },
    primaryPhone: {
      type: String,
      default: defaultContactData.primaryPhone,
      trim: true,
    },
    secondaryPhone: {
      type: String,
      default: defaultContactData.secondaryPhone,
      trim: true,
    },
    primaryEmail: {
      type: String,
      default: defaultContactData.primaryEmail,
      trim: true,
    },
    secondaryEmail: {
      type: String,
      default: defaultContactData.secondaryEmail,
      trim: true,
    },
    whatsappNumber: {
      type: String,
      default: defaultContactData.whatsappNumber,
      trim: true,
    },
    whatsappMessage: {
      type: String,
      default: defaultContactData.whatsappMessage,
      trim: true,
    },
    facebookUrl: {
      type: String,
      default: defaultContactData.facebookUrl,
      trim: true,
    },
    twitterUrl: {
      type: String,
      default: defaultContactData.twitterUrl,
      trim: true,
    },
    instagramUrl: {
      type: String,
      default: defaultContactData.instagramUrl,
      trim: true,
    },
    youtubeUrl: {
      type: String,
      default: defaultContactData.youtubeUrl,
      trim: true,
    },
    telegramUrl: {
      type: String,
      default: defaultContactData.telegramUrl,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

contactInfoSchema.statics.defaultData = defaultContactData;

contactInfoSchema.statics.getOrSeed = async function () {
  let doc = await this.findOne();
  if (!doc) {
    doc = await this.create(defaultContactData);
    console.log("✅ Seeded default Contact Info successfully");
  }
  return doc;
};

module.exports = mongoose.model("ContactInfo", contactInfoSchema);
