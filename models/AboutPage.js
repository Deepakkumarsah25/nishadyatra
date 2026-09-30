const mongoose = require("mongoose");

const defaultAboutData = {
  meta: {
    pageTitle: "निषाद संकल्प अभियान",
    pageSubtitle: "एकता, आरक्षण और स्वाभिमान का ऐतिहासिक राष्ट्रीय आंदोलन",
    heroBadge: "निषाद संकल्प अभियान",
    heroImage: "/images/about/nishad-sankalp-hero.jpg",
    stats: [
      { number: "18+", label: "उप-जातियां", sub: "एकजुट समाज" },
      { number: "75+", label: "जिले", sub: "सक्रिय विस्तार" },
      { number: "10 लाख+", label: "संकल्प पत्र", sub: "जन-समर्थन" },
      { number: "100%", label: "संवैधानिक न्याय", sub: "हमारा लक्ष्य" },
    ],
  },

  // 1. अभियान का उद्देश्य
  objective: {
    navTitle: "अभियान का उद्देश्य",
    title: "अभियान का उद्देश्य",
    tagline: "संवैधानिक अधिकार, सामाजिक न्याय और समग्र विकास",
    description:
      "निषाद, मल्लाह, केवट, बिंद, कश्यप सहित सभी 18 उपजातियों को एकजुट कर उनके संवैधानिक, सामाजिक और आर्थिक अधिकारों को सुनिश्चित करना।",
    points: [
      {
        title: "संवैधानिक आरक्षण",
        desc: "अनुच्छेद 341 के तहत मझवार/निषाद समाज की सभी समानार्थी जातियों को अनुसूचित जाति (SC) में आरक्षण दिलाना।",
      },
      {
        title: "शिक्षा एवं सशक्तिकरण",
        desc: "समाज के युवाओं के लिए उच्च शिक्षा, प्रतियोगी परीक्षा कोचिंग और छात्रवृत्ति की सुलभ व्यवस्था।",
      },
      {
        title: "जल-संसाधनों पर अधिकार",
        desc: "नदियों, तालाबों, मत्स्य पालन और नौकायन के पारंपरिक अधिकारों को स्थानीय मछुआरा समाज को दिलाना।",
      },
      {
        title: "राजनीतिक प्रतिनिधित्व",
        desc: "जनसंख्या के अनुपात में शासन, प्रशासन और नीति-निर्माण में समाज की गरिमापूर्ण भागीदारी।",
      },
    ],
    keyQuote: "",
    image: "/images/about/nishad-sankalp-rally.jpg",
  },

  // 2. मिशन
  mission: {
    navTitle: "मिशन",
    title: "हमारा मिशन",
    tagline: "हर घर तक अधिकार की चेतना और हर युवा को स्वावलंबन",
    description:
      "गांव-गांव में चौपाल, युवा संवाद और सामाजिक चेतना के माध्यम से समाज के प्रत्येक वर्ग को जागरूक और संगठित करना।",
    pillars: [
      {
        title: "संगठन शक्ति",
        desc: "ग्राम पंचायत व ब्लॉक स्तर पर समर्पित कार्यकर्ताओं की सक्रिय संकल्प समितियां।",
      },
      {
        title: "संवैधानिक संघर्ष",
        desc: "न्यायालयों, आयोगों और शासन स्तर पर आरक्षण के पक्ष में मजबूत विधिक पैरवी।",
      },
      {
        title: "नारी सशक्तिकरण",
        desc: "माताओं और बहनों को जन-जागरण और सामाजिक नेतृत्व में आगे बढ़ाना।",
      },
      {
        title: "युवा स्वावलंबन",
        desc: "आधुनिक तकनीक, स्वरोजगार और शिक्षा के माध्यम से युवाओं का मार्गदर्शन।",
      },
    ],
    targetYears: "संकल्प से सिद्धि तक",
    image: "/images/about/nishad-sankalp-chaupal.jpg",
  },

  // 3. Vision
  vision: {
    navTitle: "Vision",
    title: "हमारा विजन",
    tagline: "एक शिक्षित, स्वाभिमानी और समृद्ध समाज",
    description:
      "एक ऐसा प्रगतिशील समाज जहां हर बच्चे को बेहतर शिक्षा मिले और प्रत्येक नागरिक को उसके संवैधानिक अधिकार प्राप्त हों।",
    visionPoints: [
      {
        title: "100% साक्षरता व कौशल विकास",
        desc: "समाज के प्रत्येक युवा को आधुनिक शिक्षा और रोजगारोन्मुखी तकनीकी प्रशिक्षण।",
      },
      {
        title: "नीति-निर्माण में निर्णायक उपस्थिति",
        desc: "पंचायतों से लेकर संसद तक समाज के शिक्षित और समर्पित युवाओं का नेतृत्व।",
      },
      {
        title: "आर्थिक स्वावलंबन",
        desc: "मछुआरों व पारंपरिक कारीगरों के लिए मत्स्य पालन सहकारिता और आधुनिक सुविधाएं।",
      },
      {
        title: "सामाजिक समरसता",
        desc: "पारस्परिक सहयोग, एकता और सामाजिक कुरीतियों का उन्मूलन।",
      },
    ],
    quote: "",
    image: "/images/about/nishad-sankalp-heritage.jpg",
  },

  // 4. अभियान की पृष्ठभूमि
  background: {
    navTitle: "अभियान की पृष्ठभूमि",
    title: "अभियान की पृष्ठभूमि",
    tagline: "ऐतिहासिक गौरव और संवैधानिक अधिकारों का संघर्ष",
    description:
      "भगवान निषादराज गुह्य की ऐतिहासिक विरासत और आजादी के बाद की प्रशासनिक विसंगतियों के समाधान हेतु यह आंदोलन शुरू हुआ।",
    historicalLegacy: "",
    timeline: [
      {
        phase: "प्राचीन गौरव",
        title: "निषादराज गुह्य की विरासत",
        desc: "जल-सभ्यता, नौवहन और प्रभु श्री राम की पावन मैत्री का स्वर्णिम इतिहास।",
      },
      {
        phase: "स्वाधीनता संग्राम",
        title: "1857-1947 का बलिदान",
        desc: "देश की आजादी के लिए जल-मार्गों पर संघर्ष और वीरों का योगदान।",
      },
      {
        phase: "प्रशासनिक विसंगति",
        title: "1950 के बाद उपेक्षा",
        desc: "विभिन्न राज्यों में अलग-अलग श्रेणियों में बांटने से उत्पन्न विसंगतियां।",
      },
      {
        phase: "जन-क्रांति",
        title: "निषाद संकल्प अभियान",
        desc: "संवैधानिक अधिकारों और आरक्षण की मांग को लेकर राष्ट्रव्यापी एकजुटता।",
      },
    ],
    image: "/images/about/nishad-sankalp-hero.jpg",
  },

  // 5. आरक्षण संकल्प अभियान से संबंधित जानकारी
  reservation: {
    navTitle: "आरक्षण संकल्प जानकारी",
    title: "आरक्षण संकल्प अभियान",
    tagline: "संविधान के अनुच्छेद 341 के तहत SC आरक्षण का संवैधानिक आधार",
    description:
      "संविधान (अनुसूचित जातियां) आदेश 1950 में मझवार क्रमांक 53 पर SC श्रेणी में सूचीबद्ध है। मल्लाह, केवट, बिंद, कश्यप आदि इसकी समानार्थी उपजातियां हैं जिन्हें शासनादेश जारी कर अधिकार मिलना चाहिए।",
    legalBasis: "",
    keyDemands: [
      {
        title: "SC श्रेणी का स्पष्ट शासनादेश",
        desc: "मझवार की समानार्थी सभी 18 उपजातियों को अनुसूचित जाति का प्रमाण पत्र निर्गत किया जाए।",
        tag: "संवैधानिक मांग",
      },
      {
        title: "जल-संसाधनों पर पट्टा अधिकार",
        desc: "नदियों में बालू खनन और मत्स्य पालन का प्राथमिकता पट्टा स्थानीय मछुआरा समितियों को मिले।",
        tag: "आर्थिक अधिकार",
      },
      {
        title: "निषाद कल्याण विकास पैकेज",
        desc: "पारंपरिक नाव, मोटर, आधुनिक उपकरण व मत्स्य व्यापार हेतु ब्याज-मुक्त ऋण व सहयोग।",
        tag: "कल्याण योजना",
      },
    ],
    actionPlan: "",
    image: "/images/about/nishad-sankalp-rally.jpg",
  },

  // 6. प्रमुख गतिविधियां
  activities: {
    navTitle: "प्रमुख गतिविधियां",
    title: "प्रमुख गतिविधियां",
    tagline: "जन-संवाद, चौपाल और जन-जागरण के निरंतर प्रयास",
    description:
      "अभियान के तहत देश भर में चौपालों, रैलियों और महासम्मेलनों के जरिए समाज को जागरूक व संगठित किया जा रहा है।",
    detailTitle: "जमीनी गतिविधियां एवं जनसंपर्क विस्तार",
    detailDescription:
      "अभियान के अंतर्गत प्रत्येक गांव, पंचायत और ब्लॉक स्तर पर चौपालों और जनसंवाद कार्यक्रमों का निरंतर आयोजन किया जा रहा है, जिससे समाज के प्रत्येक व्यक्ति तक अधिकार और एकता का संदेश पहुंचे।",
    detailPoints: [
      {
        title: "गांव-गांव चौपाल व जनसंवाद",
        desc: "बुजुर्गों, युवाओं और महिलाओं के साथ बैठकर स्थानीय समस्याओं व संवैधानिक अधिकारों पर संवाद।",
      },
      {
        title: "संकल्प हस्ताक्षर अभियान",
        desc: "आरक्षण के समर्थन में लाखों परिवारों से संकल्प पत्र भरकर संगठित शक्ति का प्रदर्शन।",
      },
      {
        title: "विधिक व सामाजिक मार्गदर्शन",
        desc: "जाति प्रमाण पत्र, छात्रवृत्ति व सरकारी योजनाओं के लाभ हेतु युवाओं को मार्गदर्शन।",
      },
    ],
    activityList: [
      {
        name: "संकल्प रथ यात्रा व जनसंपर्क",
        tag: "जन-जागरण",
        desc: "गांव-गांव में हस्ताक्षर अभियान और संवैधानिक अधिकारों के प्रति जागरूकता।",
        image: "/images/about/nishad-sankalp-hero.jpg",
      },
      {
        name: "ग्राम चौपाल व पंचायत संवाद",
        tag: "जमीनी संवाद",
        desc: "हर गांव में बैठक कर शिक्षा, प्रमाण पत्र व स्थानीय समस्याओं पर सामूहिक चर्चा।",
        image: "/images/about/nishad-sankalp-chaupal.jpg",
      },
      {
        name: "सामाजिक न्याय महासम्मेलन",
        tag: "जनशक्ति प्रदर्शन",
        desc: "संवैधानिक अधिकारों और आरक्षण के पक्ष में विशाल राज्यस्तरीय सम्मेलन।",
        image: "/images/about/nishad-sankalp-rally.jpg",
      },
      {
        name: "मेधावी छात्र-छात्रा सम्मान",
        tag: "शिक्षा प्रोत्साहन",
        desc: "शिक्षा और प्रतियोगी परीक्षाओं में उत्कृष्ट प्रदर्शन करने वाले युवाओं का सम्मान।",
        image: "/images/about/nishad-sankalp-heritage.jpg",
      },
    ],
    image: "/images/about/nishad-sankalp-chaupal.jpg",
  },

  // 7. महत्वपूर्ण संदेश
  messages: {
    navTitle: "महत्वपूर्ण संदेश",
    title: "महत्वपूर्ण संदेश",
    tagline: "समाज के नाम एकता और संकल्प का आह्वान",
    description:
      "शिक्षा, स्वाभिमान और अखंड एकता ही समाज के उज्ज्वल भविष्य की आधारशिला है।",
    messagesList: [
      {
        senderName: "केंद्रीय संयोजक मंडल",
        role: "केंद्रीय नेतृत्व",
        designation: "निषाद संकल्प अभियान",
        message:
          "हमारा आंदोलन संविधान सम्मत अधिकारों का शांतिपूर्ण सत्याग्रह है। कलम और संगठन को अपनी सबसे बड़ी ताकत बनाएं।",
        photo: "/images/about/nishad-sankalp-hero.jpg",
      },
      {
        senderName: "मातृशक्ति मंच",
        role: "महिला प्रकोष्ठ",
        designation: "संयोजिका, नारी चेतना मंच",
        message:
          "एक जागरूक और शिक्षित परिवार ही समाज का भविष्य संवारता है। माताएं-बहनें हर कदम पर समाज के साथ खड़ी हैं।",
        photo: "/images/about/nishad-sankalp-chaupal.jpg",
      },
      {
        senderName: "युवा चेतना मंच",
        role: "युवा प्रकोष्ठ",
        designation: "युवा संयोजक",
        message:
          "आरक्षण हमारा संवैधानिक अधिकार है। युवा साथी शिक्षा और कानूनी तथ्यों के साथ इस अभियान को आगे बढ़ाएं।",
        photo: "/images/about/nishad-sankalp-rally.jpg",
      },
    ],
    image: "/images/about/nishad-sankalp-rally.jpg",
  },

  // फोटो गैलरी (Photo Gallery)
  gallery: {
    title: "ऐतिहासिक क्षण एवं आंदोलन की तस्वीरें",
    tagline: "रथ यात्रा, रैलियों, जनसंवाद, चौपाल और सम्मेलनों की जीवंत झलकियां",
    photos: [
      {
        title: "निषाद संकल्प अभियान का ऐतिहासिक महा-सम्मेलन",
        caption: "गंगा तट पर उमड़ा अपार जनसैलाब, समाज की एकता और अधिकारों का महा-शंखनाद।",
        category: "महासम्मेलन",
        imageUrl: "/images/about/nishad-sankalp-hero.jpg",
      },
      {
        title: "युवा एवं जनशक्ति महासम्मेलन में हुंकार",
        caption: "सामाजिक न्याय, शिक्षा और संवैधानिक अधिकारों के लिए हजारों युवाओं की संकल्प सभा।",
        category: "जनसंवाद",
        imageUrl: "/images/about/nishad-sankalp-rally.jpg",
      },
      {
        title: "श्री शृंगवेरपुर धाम — पावन विरासत व गौरव",
        caption: "भक्तराज निषादराज गुह्य की पावन तपोभूमि पर समाज के स्वाभिमान का स्वर्णिम प्रतीक।",
        category: "सांस्कृतिक गौरव",
        imageUrl: "/images/about/nishad-sankalp-heritage.jpg",
      },
      {
        title: "ग्राम चौपाल — शिक्षा और अधिकारों पर परिचर्चा",
        caption: "गांव-गांव में बुजुर्गों, महिलाओं और युवाओं के साथ सीधा संवाद और विधिक जागरूकता।",
        category: "ग्राम चौपाल",
        imageUrl: "/images/about/nishad-sankalp-chaupal.jpg",
      },
    ],
  },
};

const pointItemSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  desc: { type: String, default: "" },
  icon: { type: String, default: "" },
});

const timelineItemSchema = new mongoose.Schema({
  phase: { type: String, default: "" },
  title: { type: String, default: "" },
  desc: { type: String, default: "" },
});

const demandItemSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  desc: { type: String, default: "" },
  tag: { type: String, default: "" },
});

const activityItemSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  tag: { type: String, default: "" },
  desc: { type: String, default: "" },
  image: { type: String, default: "" },
});

const messageItemSchema = new mongoose.Schema({
  senderName: { type: String, default: "" },
  role: { type: String, default: "" },
  designation: { type: String, default: "" },
  message: { type: String, default: "" },
  photo: { type: String, default: "" },
});

const galleryPhotoSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  caption: { type: String, default: "" },
  category: { type: String, default: "सामान्य" },
  imageUrl: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const statItemSchema = new mongoose.Schema({
  number: { type: String, default: "" },
  label: { type: String, default: "" },
  sub: { type: String, default: "" },
});

const aboutPageSchema = new mongoose.Schema(
  {
    isPublished: { type: Boolean, default: true },

    meta: {
      pageTitle: { type: String, default: defaultAboutData.meta.pageTitle },
      pageSubtitle: { type: String, default: defaultAboutData.meta.pageSubtitle },
      heroBadge: { type: String, default: defaultAboutData.meta.heroBadge },
      heroImage: { type: String, default: defaultAboutData.meta.heroImage },
      stats: [statItemSchema],
    },

    objective: {
      navTitle: { type: String, default: defaultAboutData.objective.navTitle },
      title: { type: String, default: defaultAboutData.objective.title },
      tagline: { type: String, default: defaultAboutData.objective.tagline },
      description: { type: String, default: defaultAboutData.objective.description },
      points: [pointItemSchema],
      keyQuote: { type: String, default: defaultAboutData.objective.keyQuote },
      image: { type: String, default: defaultAboutData.objective.image },
    },

    mission: {
      navTitle: { type: String, default: defaultAboutData.mission.navTitle },
      title: { type: String, default: defaultAboutData.mission.title },
      tagline: { type: String, default: defaultAboutData.mission.tagline },
      description: { type: String, default: defaultAboutData.mission.description },
      pillars: [pointItemSchema],
      targetYears: { type: String, default: defaultAboutData.mission.targetYears },
      image: { type: String, default: defaultAboutData.mission.image },
    },

    vision: {
      navTitle: { type: String, default: defaultAboutData.vision.navTitle },
      title: { type: String, default: defaultAboutData.vision.title },
      tagline: { type: String, default: defaultAboutData.vision.tagline },
      description: { type: String, default: defaultAboutData.vision.description },
      visionPoints: [pointItemSchema],
      quote: { type: String, default: defaultAboutData.vision.quote },
      image: { type: String, default: defaultAboutData.vision.image },
    },

    background: {
      navTitle: { type: String, default: defaultAboutData.background.navTitle },
      title: { type: String, default: defaultAboutData.background.title },
      tagline: { type: String, default: defaultAboutData.background.tagline },
      description: { type: String, default: defaultAboutData.background.description },
      historicalLegacy: { type: String, default: defaultAboutData.background.historicalLegacy },
      timeline: [timelineItemSchema],
      image: { type: String, default: defaultAboutData.background.image },
    },

    reservation: {
      navTitle: { type: String, default: defaultAboutData.reservation.navTitle },
      title: { type: String, default: defaultAboutData.reservation.title },
      tagline: { type: String, default: defaultAboutData.reservation.tagline },
      description: { type: String, default: defaultAboutData.reservation.description },
      legalBasis: { type: String, default: defaultAboutData.reservation.legalBasis },
      keyDemands: [demandItemSchema],
      actionPlan: { type: String, default: defaultAboutData.reservation.actionPlan },
      image: { type: String, default: defaultAboutData.reservation.image },
    },

    activities: {
      navTitle: { type: String, default: defaultAboutData.activities.navTitle },
      title: { type: String, default: defaultAboutData.activities.title },
      tagline: { type: String, default: defaultAboutData.activities.tagline },
      description: { type: String, default: defaultAboutData.activities.description },
      detailTitle: { type: String, default: defaultAboutData.activities.detailTitle },
      detailDescription: { type: String, default: defaultAboutData.activities.detailDescription },
      detailPoints: [pointItemSchema],
      activityList: [activityItemSchema],
      image: { type: String, default: defaultAboutData.activities.image },
    },

    messages: {
      navTitle: { type: String, default: defaultAboutData.messages.navTitle },
      title: { type: String, default: defaultAboutData.messages.title },
      tagline: { type: String, default: defaultAboutData.messages.tagline },
      description: { type: String, default: defaultAboutData.messages.description },
      messagesList: [messageItemSchema],
      image: { type: String, default: defaultAboutData.messages.image },
    },

    gallery: {
      title: { type: String, default: defaultAboutData.gallery.title },
      tagline: { type: String, default: defaultAboutData.gallery.tagline },
      photos: [galleryPhotoSchema],
    },
  },
  {
    timestamps: true,
  }
);

aboutPageSchema.statics.defaultData = defaultAboutData;

aboutPageSchema.statics.getOrSeed = async function () {
  let doc = await this.findOne();
  if (!doc) {
    doc = await this.create(defaultAboutData);
    console.log("✅ Seeded default About Page data successfully");
  }
  return doc;
};

module.exports = mongoose.model("AboutPage", aboutPageSchema);
