const mongoose = require("mongoose");

const trustPillarSchema = new mongoose.Schema({
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
  iconKey: {
    type: String,
    default: "shield",
    trim: true,
  },
  order: {
    type: Number,
    default: 0,
  },
});

const whyChooseSchema = new mongoose.Schema(
  {
    sectionTag: {
      type: String,
      default: "पारदर्शिता और प्रतिबद्धता",
      trim: true,
    },
    sectionTitle: {
      type: String,
      default: "निषाद संकल्प अभियान",
      trim: true,
    },
    highlightText: {
      type: String,
      default: "ही क्यों चुनें?",
      trim: true,
    },
    sectionSubtitle: {
      type: String,
      default:
        "हमारा उद्देश्य राजनीतिक स्वार्थ नहीं, बल्कि समाज के अंतिम व्यक्ति तक शिक्षा, स्वाभिमान, विधिक सुरक्षा और आर्थिक उन्नति पहुंचाना है।",
      trim: true,
    },
    introHeading: {
      type: String,
      default: "धरातलीय सत्य और अटूट निष्ठा से बना हमारा आधार",
      trim: true,
    },
    introDesc: {
      type: String,
      default:
        "वर्षों के संघर्ष और निरंतर सेवा से हमने समाज का अटूट विश्वास अर्जित किया है। हर कदम पर आपके साथ चलना ही हमारा प्रथम कर्तव्य है।",
      trim: true,
    },
    pillars: {
      type: [trustPillarSchema],
      default: [],
    },
    quoteText: {
      type: String,
      default:
        "जब समाज का एक-एक हाथ साथ जुड़ता है, तो इतिहास की दिशा बदल जाती है। निषाद संकल्प अभियान आपकी आवाज है।",
      trim: true,
    },
    pledgePoints: {
      type: [String],
      default: [
        "निःशुल्क सदस्यता एवं पारदर्शी भागीदारी",
        "गांव व ब्लॉक स्तर पर प्रत्यक्ष संवाद बैठकें",
        "छात्रों और युवाओं के लिए व्यक्तिगत मार्गदर्शन",
        "आपदा व संकट में तत्काल स्वयंसेवक दल सेवा",
      ],
    },
    pledgeBtnText: {
      type: String,
      default: "आज ही संकल्प ग्रहण करें",
      trim: true,
    },
    pledgeBtnLink: {
      type: String,
      default: "#quickActionSidebar",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WhyChoose", whyChooseSchema);
