const HeroSlide = require("../models/HeroSlide");
const Initiative = require("../models/Initiative");
const WhyChoose = require("../models/WhyChoose");
const SiteNotice = require("../models/SiteNotice");
const HomeQuickInfo = require("../models/HomeQuickInfo");

const defaultHeroSlides = [
  {
    tag: "राष्ट्र व समाज हित",
    badgeText: "॥ जय निषादराज ॥ अखंड चेतना एवं सशक्तिकरण संकल्प",
    headingPrefix: "एकता, स्वाभिमान और",
    highlightText: "उज्ज्वल भविष्य",
    headingSuffix: "की ओर एक मजबूत कदम",
    description:
      "निषाद संकल्प अभियान समाज के प्रत्येक वर्ग को संगठित करने, युवाओं को गुणवत्तापूर्ण शिक्षा व रोजगार मार्गदर्शन प्रदान करने, और सांस्कृतिक गौरव को संरक्षित करने का एक निरंतर जन-अभियान है।",
    imageUrl:
      "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1920&q=85",
    primaryBtnText: "अभियान से जुड़ें",
    primaryBtnLink: "#quickActionSidebar",
    primaryBtnInitiative: "",
    secondaryBtnText: "हमारे मुख्य कार्य",
    secondaryBtnLink: "#what-we-do",
    secondaryBtnInitiative: "",
    order: 1,
    isActive: true,
  },
  {
    tag: "सांस्कृतिक धरोहर",
    badgeText: "जल, नौकायन और नदी तटवर्ती संस्कृति का सम्मान",
    headingPrefix: "नदियों की अविरलता और",
    highlightText: "पारंपरिक आजीविका",
    headingSuffix: "का संरक्षण",
    description:
      "सदियों से नदियों पर निर्भर परिवारों के पारंपरिक नौकायन व खनन अधिकारों की रक्षा, आधुनिक सुरक्षा उपकरण वितरण और तटवर्ती स्वच्छता के लिए समर्पित जन-आंदोलन।",
    imageUrl:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85",
    primaryBtnText: "नदी संरक्षण अभियान से जुड़ें",
    primaryBtnLink: "#initiativeAction",
    primaryBtnInitiative: "river-rights",
    secondaryBtnText: "हमारे संकल्प देखें",
    secondaryBtnLink: "#why-choose",
    secondaryBtnInitiative: "",
    order: 2,
    isActive: true,
  },
  {
    tag: "युवा स्वावलंबन",
    badgeText: "शिक्षा, कौशल विकास और प्रतियोगी परीक्षाओं में सहयोग",
    headingPrefix: "हर मेधावी छात्र को",
    highlightText: "उचित मंच व मार्गदर्शन",
    headingSuffix: "",
    description:
      "निःशुल्क डिजिटल लाइब्रेरी, प्रतियोगी परीक्षाओं के लिए वरिष्ठ अधिकारियों द्वारा मेंटरशिप और स्वरोजगार के लिए सरकारी योजनाओं का सीधा लाभ।",
    imageUrl:
      "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1920&q=85",
    primaryBtnText: "युवा विंग से संपर्क करें",
    primaryBtnLink: "#initiativeAction",
    primaryBtnInitiative: "youth-wing",
    secondaryBtnText: "स्वरोजगार योजनाएं",
    secondaryBtnLink: "#initiativeAction",
    secondaryBtnInitiative: "schemes-info",
    order: 3,
    isActive: true,
  },
];

const defaultInitiatives = [
  {
    key: "social-rights",
    cardTag: "चेतना व जागरण",
    title: "सामाजिक एकता व अधिकार जागरण",
    description:
      "ग्राम्य चौपालों और जन-संवाद के माध्यम से समाज को संवैधानिक अधिकारों, कल्याणकारी योजनाओं और नीतिगत लाभों के प्रति जागरूक करना।",
    points: [
      "प्रत्येक ग्राम पंचायत में विधिक जागरूकता शिविर",
      "सामाजिक कुरीतियों व अंधविश्वास का उन्मूलन",
    ],
    btnText: "सहयोग दें या जुड़ें",
    modalTag: "चेतना व जागरण प्रकोष्ठ",
    modalTitle: "सामाजिक एकता व विधिक अधिकार सहयोग",
    modalDescription:
      "निषाद संकल्प अभियान के अंतर्गत ग्राम स्तर पर विधिक सहायता शिविर, राशन व पेंशन लाभ, और संवैधानिक अधिकारों की सुरक्षा हेतु सक्रिय प्रकोष्ठ।",
    modalHighlights: [
      "सरकारी योजनाओं और अनुलाभों में प्रशासनिक अड़चनों का निःशुल्क समाधान।",
      "पारंपरिक बस्तियों व घाटों पर विधिक परामर्श चौपाल का नियमित आयोजन।",
      "समाजिक कुरीतियों के विरुद्ध सामूहिक संकल्प व चेतना अभियान।",
    ],
    helplineText: "अधिकार सहायता: +91 99999 99999",
    helplineTel: "+919999999999",
    formTitle: "सहयोग अथवा समस्या निवारण हेतु पंजीकरण",
    formSubmitText: "सहयोग अनुरोध भेजें",
    iconKey: "scale",
    order: 1,
    isActive: true,
  },
  {
    key: "youth-wing",
    cardTag: "शिक्षा संवर्धन",
    title: "शिक्षा सहायता एवं युवा मार्गदर्शन",
    description:
      "होनहार छात्र-छात्राओं को छात्रवृत्ति मार्गदर्शन, प्रतियोगी परीक्षाओं के लिए अध्ययन सामग्री और उच्च शिक्षा हेतु उचित परामर्श उपलब्ध कराना।",
    points: [
      "निःशुल्क पुस्तकालय एवं अध्ययन केंद्र की स्थापना",
      "सिविल सेवा व तकनीकी परीक्षाओं की निशुल्क मेंटरशिप",
    ],
    btnText: "युवा विंग से संपर्क करें",
    modalTag: "शिक्षा व युवा प्रकोष्ठ",
    modalTitle: "युवा विंग मार्गदर्शन एवं छात्र सहायता",
    modalDescription:
      "प्रतियोगी परीक्षाओं (UPSC, UPPSC, SSC, Police, Army, Agniveer) की तैयारी कर रहे छात्र-छात्राओं के लिए विशेष मेंटरशिप और पुस्तक सहायता।",
    modalHighlights: [
      "सफल अधिकारियों व अनुभवी शिक्षकों द्वारा निःशुल्क करियर काउंसलिंग।",
      "डिजिटल स्टडी मटेरियल, करंट अफेयर्स और टेस्ट सीरीज़ की सुविधा।",
      "आर्थिक रूप से कमजोर मेधावी विद्यार्थियों के लिए छात्रवृत्ति समन्वय।",
    ],
    helplineText: "युवा विंग हेल्पलाइन: +91 99999 99998",
    helplineTel: "+919999999998",
    formTitle: "विद्यार्थी मार्गदर्शन आवेदन फॉर्म",
    formSubmitText: "युवा विंग से मार्गदर्शन प्राप्त करें",
    iconKey: "school",
    order: 2,
    isActive: true,
  },
  {
    key: "schemes-info",
    cardTag: "आर्थिक स्वावलंबन",
    title: "स्वरोजगार व मत्स्य पालन आधुनिकीकरण",
    description:
      "पारंपरिक नौकायन, आधुनिक मत्स्य पालन, बायोफ्लॉक तकनीक और लघु उद्योगों के लिए सरकारी सब्सिडी व ऋण दिलाने में पूर्ण सहयोग।",
    points: [
      "प्रधानमंत्री मत्स्य संपदा योजना से सीधा जुड़ाव",
      "स्वयं सहायता समूहों (SHG) का गठन व वित्तीय सशक्तिकरण",
    ],
    btnText: "योजनाओं की जानकारी पाएं",
    modalTag: "स्वरोजगार व योजना केंद्र",
    modalTitle: "मत्स्य संपदा व स्वरोजगार योजनाएं",
    modalDescription:
      "केंद्र व राज्य सरकार द्वारा नाविकों, मत्स्य पालकों और लघु उद्यमियों के लिए संचालित सभी कल्याणकारी योजनाओं की सटीक जानकारी व आवेदन सहयोग।",
    modalHighlights: [
      "प्रधानमंत्री मत्स्य संपदा योजना (PMMSY) - 40% से 60% तक सरकारी अनुदान।",
      "नाविक किसान क्रेडिट कार्ड (KCC) - रियायती ब्याज दर पर ऋण सुविधा।",
      "स्वयं सहायता समूहों (SHG) का गठन, रजिस्ट्रेशन एवं वित्तीय मार्गदर्शन।",
    ],
    helplineText: "योजना परामर्श: +91 99999 99997",
    helplineTel: "+919999999997",
    formTitle: "योजना आवेदन सहायता अनुरोध",
    formSubmitText: "योजना जानकारी व सहयोग मांगें",
    iconKey: "trending",
    order: 3,
    isActive: true,
  },
  {
    key: "river-rights",
    cardTag: "जल व पर्यावरण",
    title: "नदी संरक्षण व तटवर्ती अधिकार",
    description:
      "पवित्र नदियों की स्वच्छता, घाटों की सुरक्षा और सदियों से नदियों पर निर्भर परिवारों के पारंपरिक नौकायन व खनन अधिकारों की रक्षा।",
    points: [
      "नदी तटवर्ती स्वच्छता एवं जन-जागरण रैलियां",
      "घाटों पर सुरक्षा उपकरण व नाविक कल्याण कोष",
    ],
    btnText: "अभियान में सहभागी बनें",
    modalTag: "जल व तटवर्ती अधिकार",
    modalTitle: "नदी संरक्षण, घाट सुरक्षा व आजीविका अधिकार",
    modalDescription:
      "पवित्र नदियों की अविरलता, घाटों के सौंदर्यीकरण और पारंपरिक नदी तटीय परिवारों के नौकायन व आजीविका अधिकारों के संरक्षण का सामूहिक अभियान।",
    modalHighlights: [
      "गंगा, यमुना और सहायक नदियों के घाटों पर नियमित स्वच्छता व सुरक्षा अभियान।",
      "नाविक बंधुओं के लिए आधुनिक लाइफ-जैकेट, सुरक्षा किट व आपातकालीन प्रशिक्षण।",
      "पारंपरिक नौकायन व मछली पकड़ने के ऐतिहासिक अधिकारों की कानूनी सुरक्षा।",
    ],
    helplineText: "नदी प्रहरी हेल्पलाइन: +91 99999 99996",
    helplineTel: "+919999999996",
    formTitle: "नदी प्रहरी / पर्यावरण मित्र स्वयंसेवक फॉर्म",
    formSubmitText: "अभियान में सहभागिता दर्ज करें",
    iconKey: "water",
    order: 4,
    isActive: true,
  },
  {
    key: "disaster-relief",
    cardTag: "सेवा व स्वास्थ्य",
    title: "आपातकालीन बाढ़ राहत व स्वास्थ्य शिविर",
    description:
      "बाढ़ व प्राकृतिक आपदा के समय तटीय ग्रामों में राशन, दवाइयां, शुद्ध पेयजल और सुरक्षित स्थानों तक पहुंचाने का त्वरित बचाव कार्य।",
    points: [
      "त्वरित रिस्पॉन्स वालंटियर टीम का 24 घंटे नेटवर्क",
      "गांवों में निःशुल्क मेडिकल चेकअप और दवाई वितरण",
    ],
    btnText: "राहत दल में शामिल हों",
    modalTag: "आपदा सेवा व राहत दल",
    modalTitle: "आपातकालीन बाढ़ राहत व स्वास्थ्य सेवा दल",
    modalDescription:
      "नदी तटवर्ती एवं निचले क्षेत्रों में बाढ़ अथवा आकस्मिक संकट के समय भोजन, दवा, स्वच्छ जल और नावों द्वारा सुरक्षित बचाव कार्य का विशेष स्वयंसेवक नेटवर्क।",
    modalHighlights: [
      "24x7 सक्रिय स्थानीय नाविक व तैराक स्वयंसेवकों का त्वरित बचाव दस्ता।",
      "बाढ़ प्रभावित परिवारों को सूखा राशन, शुद्ध जल व तिरपाल वितरण।",
      "बाढ़ के पश्चात संक्रामक रोगों से बचाव हेतु निःशुल्क मेडिकल चेकअप कैंप।",
    ],
    helplineText: "आपातकालीन राहत: 1800-123-4567 / +91 99999 99995",
    helplineTel: "+919999999995",
    formTitle: "राहत स्वयंसेवक / सहायता अनुरोध फॉर्म",
    formSubmitText: "राहत दल में शामिल हों",
    iconKey: "hospital",
    order: 5,
    isActive: true,
  },
  {
    key: "cultural-events",
    cardTag: "सांस्कृतिक गौरव",
    title: "निषादराज गुह्य जी की गौरवशाली गाथा",
    description:
      "भगवान श्रीराम के अनन्य सखा महाराज निषादराज गुह्य की ऐतिहासिक मित्रता, त्याग और शौर्य की गाथा को नई पीढ़ी तक पहुंचाना व सम्मान।",
    points: [
      "वार्षिक निषादराज जयंती व सांस्कृतिक सम्मेलन",
      "समाज के वरिष्ठ मार्गदर्शकों का सम्मान समारोह",
    ],
    btnText: "सांस्कृतिक उत्सव विवरण",
    modalTag: "सांस्कृतिक गौरव प्रकोष्ठ",
    modalTitle: "सांस्कृतिक धरोहर एवं निषादराज जयंती महोत्सव",
    modalDescription:
      "महाराज निषादराज गुह्य जी की गौरवशाली गाथा, ऐतिहासिक मित्रता और समाज के महापुरुषों के त्याग व शौर्य को जन-जन तक पहुंचाने का पावन उत्सव।",
    modalHighlights: [
      "वार्षिक राज्यस्तरीय निषादराज जयंती, भव्य शोभायात्रा व सांस्कृतिक संध्या।",
      "श्रृंगवेरपुर धाम, प्रयागराज व काशी में विचार गोष्ठियां व सम्मेलन।",
      "शिक्षा, खेल, कला और समाजसेवा में उत्कृष्ट युवाओं व वरिष्ठों का सम्मान समारोह।",
    ],
    helplineText: "उत्सव समिति संपर्क: +91 99999 99994",
    helplineTel: "+919999999994",
    formTitle: "उत्सव में भागीदारी / आमंत्रण अनुरोध",
    formSubmitText: "उत्सव विवरण व आमंत्रण पाएं",
    iconKey: "flag",
    order: 6,
    isActive: true,
  },
];

const defaultWhyChoose = {
  sectionTag: "पारदर्शिता और प्रतिबद्धता",
  sectionTitle: "निषाद संकल्प अभियान",
  highlightText: "ही क्यों चुनें?",
  sectionSubtitle:
    "हमारा उद्देश्य राजनीतिक स्वार्थ नहीं, बल्कि समाज के अंतिम व्यक्ति तक शिक्षा, स्वाभिमान, विधिक सुरक्षा और आर्थिक उन्नति पहुंचाना है।",
  introHeading: "धरातलीय सत्य और अटूट निष्ठा से बना हमारा आधार",
  introDesc:
    "वर्षों के संघर्ष और निरंतर सेवा से हमने समाज का अटूट विश्वास अर्जित किया है। हर कदम पर आपके साथ चलना ही हमारा प्रथम कर्तव्य है।",
  pillars: [
    {
      title: "100% धरातल पर सक्रिय उपस्थिति",
      description:
        "कागजी दावों के स्थान पर गांवों, कस्बों और घाटों पर व्यक्तिगत रूप से समस्याओं का समाधान।",
      iconKey: "shield",
      order: 1,
    },
    {
      title: "निःस्वार्थ व पारदर्शी नेतृत्व",
      description:
        "कोई गुप्त एजेंडा नहीं, प्रत्येक कोष, गतिविधि और निर्णय समाज के सामूहिक हित में खुले तौर पर लिया जाता है।",
      iconKey: "users",
      order: 2,
    },
    {
      title: "सटीक परिणाम और त्वरित सहायता",
      description:
        "छात्रवृत्ति, प्रशासनिक बाधा या कानूनी मार्गदर्शन में हमारे कार्यकर्ता तुरंत धरातल पर खड़े होते हैं।",
      iconKey: "check",
      order: 3,
    },
    {
      title: "सांस्कृतिक गौरव संग आधुनिक सोच",
      description:
        "परंपरा और मूल्यों पर गर्व करते हुए भावी पीढ़ी को विज्ञान, तकनीक और उच्च प्रतिस्पर्धा में दक्ष बनाना।",
      iconKey: "award",
      order: 4,
    },
  ],
  quoteText:
    "जब समाज का एक-एक हाथ साथ जुड़ता है, तो इतिहास की दिशा बदल जाती है। निषाद संकल्प अभियान आपकी आवाज है।",
  pledgePoints: [
    "निःशुल्क सदस्यता एवं पारदर्शी भागीदारी",
    "गांव व ब्लॉक स्तर पर प्रत्यक्ष संवाद बैठकें",
    "छात्रों और युवाओं के लिए व्यक्तिगत मार्गदर्शन",
    "आपदा व संकट में तत्काल स्वयंसेवक दल सेवा",
  ],
  pledgeBtnText: "आज ही संकल्प ग्रहण करें",
  pledgeBtnLink: "#quickActionSidebar",
};

const defaultNotices = [
  {
    title: "युवा मार्गदर्शन शिविर: प्रतियोगी परीक्षाओं के लिए निःशुल्क सहायता सत्र।",
    dateText: "28 सितम्बर 2026",
    link: "",
    order: 1,
    isActive: true,
  },
  {
    title: "गंगा तटवर्ती स्वच्छता एवं समाज संवाद यात्रा का द्वितीय चरण प्रारंभ।",
    dateText: "02 अक्टूबर 2026",
    link: "",
    order: 2,
    isActive: true,
  },
];

const defaultQuickInfo = {
  sidebarTitle: "निषाद संकल्प अभियान",
  sidebarSubtitle: "त्वरित सेवा एवं सहायता केंद्र",
  pledgeBoxTitle: "अभियान से संकल्पबद्ध जुड़ें",
  pledgeBoxDesc:
    "समाज के उत्थान और सशक्तिकरण के लिए अपना ऑनलाइन संकल्प दर्ज करें।",
  helplineText: "हेल्पलाइन: +91 99999 99999",
  helplineTel: "+919999999999",
  email: "info@nishadsankalp.org",
  sidebarFooterText: "॥ जन-सेवा ही सच्चा संकल्प है ॥",
};

const seedHomeData = async () => {
  try {
    // 1. Hero Slides
    const heroCount = await HeroSlide.countDocuments();
    if (heroCount === 0) {
      await HeroSlide.insertMany(defaultHeroSlides);
      console.log("✅ Seeded default Hero Slides");
    }

    // 2. Initiatives
    const initiativeCount = await Initiative.countDocuments();
    if (initiativeCount === 0) {
      await Initiative.insertMany(defaultInitiatives);
      console.log("✅ Seeded default Initiatives");
    }

    // 3. Why Choose Us
    const whyChooseCount = await WhyChoose.countDocuments();
    if (whyChooseCount === 0) {
      await WhyChoose.create(defaultWhyChoose);
      console.log("✅ Seeded default Why Choose Us section");
    }

    // 4. Site Notices
    const noticeCount = await SiteNotice.countDocuments();
    if (noticeCount === 0) {
      await SiteNotice.insertMany(defaultNotices);
      console.log("✅ Seeded default Site Notices");
    }

    // 5. Quick Info
    const quickInfoCount = await HomeQuickInfo.countDocuments();
    if (quickInfoCount === 0) {
      await HomeQuickInfo.create(defaultQuickInfo);
      console.log("✅ Seeded default Home Quick Info");
    }
  } catch (err) {
    console.error("⚠️ Home data seed notice:", err.message);
  }
};

module.exports = {
  seedHomeData,
  defaultHeroSlides,
  defaultInitiatives,
  defaultWhyChoose,
  defaultNotices,
  defaultQuickInfo,
};
