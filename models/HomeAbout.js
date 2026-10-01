const mongoose = require("mongoose");

const homeAboutSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    badgeText: {
      type: String,
      default: "★ अभियान परिचय • Nishad Sankalp Campaign",
    },
    headingPrefix: {
      type: String,
      default: "निषाद समाज के स्वाभिमान, एकता और",
    },
    highlightHeading: {
      type: String,
      default: "संवैधानिक अधिकारों का ऐतिहासिक जन-आंदोलन",
    },
    headingSuffix: {
      type: String,
      default: "",
    },
    tagline: {
      type: String,
      default: "18 उपजातियों की एकजुटता, आरक्षण न्याय और सामाजिक सशक्तिकरण का महाअभियान",
    },
    description1: {
      type: String,
      default:
        "निषाद संकल्प अभियान समाज के सभी वर्गों—मल्लाह, केवट, बिंद, कश्यप, धीवर, मांझी, साहनी सहित सभी 18 उपजातियों को एक सूत्र में पिरोकर उनके संवैधानिक अधिकारों, सामाजिक न्याय और सम्मानजनक भागीदारी के लिए समर्पित एक राष्ट्रीय चेतना आंदोलन है।",
    },
    description2: {
      type: String,
      default:
        "गांव-गांव में चौपाल, युवा संवाद और संकल्प यात्राओं के माध्यम से जन-जन को उनके लोकतांत्रिक अधिकारों के प्रति जागरूक किया जा रहा है। शिक्षा, स्वरोजगार और राजनीतिक हिस्सेदारी ही समाज के सर्वांगीण उत्थान का सच्चा मार्ग है।",
    },
    imageUrl: {
      type: String,
      default: "/images/about/nishad-sankalp-rally.jpg",
    },
    images: {
      type: [String],
      default: [
        "/images/about/nishad-sankalp-rally.jpg",
        "/images/about/nishad-sankalp-hero.jpg",
        "/images/about/nishad-sankalp-chaupal.jpg",
        "/images/about/nishad-sankalp-heritage.jpg",
      ],
    },
    imageBadgeNumber: {
      type: String,
      default: "18+",
    },
    imageBadgeLabel: {
      type: String,
      default: "उप-जातियां एकजुट",
    },
    floatingBadgeText: {
      type: String,
      default: "ऐतिहासिक जन आंदोलन",
    },
    points: [
      {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        iconKey: { type: String, default: "shield" },
      },
    ],
    stats: [
      {
        number: { type: String, default: "" },
        label: { type: String, default: "" },
      },
    ],
    quoteText: {
      type: String,
      default: "संगठन में ही समाज की वास्तविक शक्ति है और संवैधानिक न्याय हमारा जन्मसिद्ध अधिकार है।",
    },
    quoteAuthor: {
      type: String,
      default: "— निषाद संकल्प आह्वान",
    },
    readMoreText: {
      type: String,
      default: "Read More...",
    },
    readMoreLink: {
      type: String,
      default: "/about",
    },
    primaryBtnText: {
      type: String,
      default: "Read More...",
    },
    primaryBtnLink: {
      type: String,
      default: "/about",
    },
    secondaryBtnText: {
      type: String,
      default: "",
    },
    secondaryBtnLink: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const defaultHomeAboutData = {
  isActive: true,
  badgeText: "★ अभियान परिचय • Nishad Sankalp Campaign",
  headingPrefix: "निषाद समाज के स्वाभिमान, एकता और",
  highlightHeading: "संवैधानिक अधिकारों का ऐतिहासिक जन-आंदोलन",
  headingSuffix: "",
  tagline: "18 उपजातियों की एकजुटता, आरक्षण न्याय और सामाजिक सशक्तिकरण का महाअभियान",
  description1:
    "निषाद संकल्प अभियान समाज के सभी वर्गों—मल्लाह, केवट, बिंद, कश्यप, धीवर, मांझी, साहनी सहित सभी 18 उपजातियों को एक सूत्र में पिरोकर उनके संवैधानिक अधिकारों, सामाजिक न्याय और सम्मानजनक भागीदारी के लिए समर्पित एक राष्ट्रीय चेतना आंदोलन है।",
  description2:
    "गांव-गांव में चौपाल, युवा संवाद और संकल्प यात्राओं के माध्यम से जन-जन को उनके लोकतांत्रिक अधिकारों के प्रति जागरूक किया जा रहा है। शिक्षा, स्वरोजगार और राजनीतिक हिस्सेदारी ही समाज के सर्वांगीण उत्थान का सच्चा मार्ग है।",
  imageUrl: "/images/about/nishad-sankalp-rally.jpg",
  images: [
    "/images/about/nishad-sankalp-rally.jpg",
    "/images/about/nishad-sankalp-hero.jpg",
    "/images/about/nishad-sankalp-chaupal.jpg",
    "/images/about/nishad-sankalp-heritage.jpg",
  ],
  imageBadgeNumber: "18+",
  imageBadgeLabel: "उप-जातियां एकजुट",
  floatingBadgeText: "ऐतिहासिक जन आंदोलन",
  points: [
    {
      title: "संवैधानिक आरक्षण न्याय",
      description: "अनुच्छेद 341 के अंतर्गत मझवार/निषाद समाज की सभी जातियों को अनुसूचित जाति (SC) श्रेणी में आरक्षण का अधिकार।",
      iconKey: "scale",
    },
    {
      title: "शिक्षा एवं युवा स्वावलंबन",
      description: "छात्रवृत्ति, प्रतियोगी परीक्षाओं की निशुल्क कोचिंग व तकनीकी स्वरोजगार से युवाओं का भविष्य उज्ज्वल बनाना।",
      iconKey: "book",
    },
    {
      title: "पारंपरिक जल-संसाधन अधिकार",
      description: "नदियों, पोखरों, मत्स्य पालन और नौकायन के पारंपरिक अधिकारों को स्थानीय मछुआरा समाज के लिए सुरक्षित करना।",
      iconKey: "shield",
    },
    {
      title: "सामाजिक व राजनीतिक चेतना",
      description: "समानुपातिक प्रतिनिधित्व और नीति-निर्माण में समाज के समर्पित युवाओं व नेतृत्वकर्ताओं की सीधी भागीदारी।",
      iconKey: "users",
    },
  ],
  stats: [
    { number: "18+", label: "उप-जातियां" },
    { number: "75+", label: "जिले" },
    { number: "10 लाख+", label: "संकल्प पत्र" },
    { number: "100%", label: "संवैधानिक न्याय" },
  ],
  quoteText: "संगठन में ही समाज की वास्तविक शक्ति है और संवैधानिक न्याय हमारा जन्मसिद्ध अधिकार है।",
  readMoreText: "Read More...",
  readMoreLink: "/about",
  primaryBtnText: "Read More...",
  primaryBtnLink: "/about",
  secondaryBtnText: "",
  secondaryBtnLink: "",
};

homeAboutSchema.statics.defaultData = defaultHomeAboutData;

homeAboutSchema.statics.getOrSeed = async function () {
  let doc = await this.findOne();
  if (!doc) {
    doc = await this.create(defaultHomeAboutData);
  }
  return doc;
};

module.exports = mongoose.model("HomeAbout", homeAboutSchema);
