const mongoose = require("mongoose");

const defaultKalashYatraData = {
  hero: {
    liveBadgeText: "पावन संकल्प अभियान • राष्ट्रीय महा-आयोजन",
    headingMain: "कलश यात्रा",
    headingHighlight: "एकता, संस्कृति और स्वाभिमान का पावन संगम",
    subheading:
      "पवित्र नदियों के पावन जल से सिंचित यह महा-अभियान सम्पूर्ण समाज को एक सूत्र में पिरोने, सांस्कृतिक चेतना जगाने और स्वाभिमानी भारत के निर्माण का ऐतिहासिक शंखनाद है।",
    highlights: [
      "पवित्र गंगा, सरयू, नर्मदा व गंडक जल का पावन अर्चन",
      "मातृशक्ति की अप्रतिम सहभागिता और अखंड संकल्प",
      "सामाजिक समरसता व अधिकार चेतना का महा-जागरण",
    ],
    primaryBtnText: "पावन वीडियो देखें",
    primaryBtnLink: "#videoGallery",
    secondaryBtnText: "संकल्प से जुड़ें",
    secondaryBtnLink: "#pillarsSection",
    stats: [
      { number: "150+", label: "जिलों में विस्तार", sub: "पवित्र संकल्प यात्रा" },
      { number: "50,000+", label: "मंगल कलश पूजन", sub: "वैदिक विधि-विधान" },
      { number: "10,000+", label: "मातृशक्ति सहभागिता", sub: "अग्रिम पंक्ति में" },
      { number: "28+", label: "राज्यों में चेतना", sub: "अखंड राष्ट्रीय अभियान" },
    ],
    featuredVideo: {
      title: "ऐतिहासिक कलश यात्रा का पावन शंखनाद — भव्य आयोजन",
      duration: "12:45 Min",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      posterImage: "/images/kalash-yatra-hero.jpg",
      badge: "★ विशेष प्रस्तुति",
    },
  },

  milestonesSection: {
    kicker: "★ विशेष संकलन • निषाद संकल्प अभियान",
    title: "कलश यात्रा — ",
    titleHighlight: "एकता और संकल्प की पावन महायात्रा",
    subtitle:
      "गोपालगंज से लेकर काशी, अयोध्या, भोपाल और रांची तक — 150+ जिलों में पवित्र नदियों के जल से समाज में समरसता और स्वाभिमान की अलख जगाती ऐतिहासिक पदयात्रा के मुख्य पड़ाव।",
    items: [
      {
        stateKey: "bihar",
        stateName: "बिहार",
        district: "गोपालगंज",
        title: "गोपालगंज ऐतिहासिक कलश यात्रा",
        image: "/images/kalash-yatra-featured.jpg",
        description:
          "हजारों माताओं-बहनों ने सिर पर मंगल कलश धारण कर समाज में नई चेतना और समरसता का दिव्य संदेश दिया।",
        tag: "🚩 प्रथम पड़ाव",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        order: 1,
      },
      {
        stateKey: "uttar-pradesh",
        stateName: "उत्तर प्रदेश",
        district: "वाराणसी घाट",
        title: "काशी के पावन घाटों पर गंगा पूजन",
        image: "/images/ghat-kalash-procession.jpg",
        description:
          "दशाश्वमेध व अस्सी घाट पर शंखनाद और मंत्रोच्चार के साथ पवित्र जल का अर्चन।",
        tag: "🌊 पावन गंगा अर्चन",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        order: 2,
      },
      {
        stateKey: "uttar-pradesh",
        stateName: "उत्तर प्रदेश",
        district: "अयोध्या - प्रयागराज",
        title: "अयोध्या-प्रयागराज महासंगम",
        image: "/images/sacred-kalash-ritual.jpg",
        description:
          "वैदिक परंपरा से श्रीफल व आम्रपल्लव स्थापन, सामाजिक एकता का अद्भुत दृश्य।",
        tag: "🪔 वैदिक अनुष्ठान",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        order: 3,
      },
      {
        stateKey: "madhya-pradesh",
        stateName: "मध्य प्रदेश",
        district: "भोपाल",
        title: "भोपाल महासम्मेलन व जनसैलाब",
        image: "/images/kalash-yatra-hero.jpg",
        description:
          "नर्मदांचल के हजारों श्रद्धालुओं का ऐतिहासिक संगठन और स्वाभिमान का शंखनाद।",
        tag: "🏛️ महासम्मेलन",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        order: 4,
      },
      {
        stateKey: "jharkhand",
        stateName: "झारखंड",
        district: "रांची",
        title: "रांची पावन कलश शोभायात्रा",
        image: "/images/ranchi-kalash-procession.jpg",
        description:
          "जनजातीय व तटीय बंधुओं की अखंड सहभागिता के साथ सुवर्णरेखा नदी के तट पर मंगल संकल्प।",
        tag: "🌿 स्वाभिमान यात्रा",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        order: 5,
      },
    ],
  },

  videos: [
    {
      title: "गोपालगंज में भव्य कलश यात्रा — 5000+ माताओं-बहनों की ऐतिहासिक सहभागिता",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "/images/kalash-yatra-hero.jpg",
      personOrPlace: "मातृशक्ति सम्मेलन, गोपालगंज मुख्य चौक",
      category: "yatra",
      state: "bihar",
      district: "गोपालगंज",
      duration: "14:20 Min",
      viewsCount: "18.5K",
      date: "14 जनवरी 2024",
      description:
        "गोपालगंज जिले में आयोजित इस पावन कलश यात्रा में समाज के हर वर्ग ने उत्साहपूर्वक भाग लिया। वैदिक मंत्रोच्चार के बीच गंगा-गंडक जल का अर्चन किया गया।",
      tag: "कलश यात्रा",
      order: 1,
    },
    {
      title: "वाराणसी दशाश्वमेध घाट — गंगा पूजन एवं पावन कलश स्थापन महा-अनुष्ठान",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "/images/ghat-kalash-procession.jpg",
      personOrPlace: "दशाश्वमेध घाट, काशी विश्वनाथ धाम",
      category: "program",
      state: "uttar-pradesh",
      district: "वाराणसी",
      duration: "18:45 Min",
      viewsCount: "24.1K",
      date: "22 जनवरी 2024",
      description:
        "काशी विश्वनाथ की पावन नगरी में मां गंगा के जल से कलश पूजन का अलौकिक दृश्य। निषादराज के स्वाभिमान और सनातन संस्कृति का भव्य संगम।",
      tag: "कार्यक्रम",
      order: 2,
    },
    {
      title: "समाज के गौरव और एकता पर ऐतिहासिक संबोधन — निषाद संकल्प सम्मेलन",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "/images/kalash-yatra-featured.jpg",
      personOrPlace: "डॉ. संजय निषाद / गांधी मैदान, पटना",
      category: "speech",
      state: "bihar",
      district: "पटना",
      duration: "26:10 Min",
      viewsCount: "32.8K",
      date: "05 फरवरी 2024",
      description:
        "पटना में आयोजित राज्यस्तरीय सम्मेलन में समाज के उत्थान, शिक्षा और संगठित शक्ति पर दिए गए ओजस्वी विचार।",
      tag: "संबोधन",
      order: 3,
    },
    {
      title: "भोपाल में नर्मदा जल कलश यात्रा — मध्य प्रदेश के हजारों श्रद्धालुओं का जनसैलाब",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "/images/sacred-kalash-ritual.jpg",
      personOrPlace: "नर्मदांचल समिति, वीआईपी रोड भोपाल",
      category: "yatra",
      state: "madhya-pradesh",
      district: "भोपाल",
      duration: "11:55 Min",
      viewsCount: "12.3K",
      date: "18 फरवरी 2024",
      description:
        "मां नर्मदा के पावन जल को साक्षी मानकर सामाजिक समरसता और स्वावलंबन का संकल्प लिया गया।",
      tag: "कलश यात्रा",
      order: 4,
    },
    {
      title: "रांची सुवर्णरेखा तट — झारखंड में पावन कलश यात्रा व सामाजिक चेतना सम्मेलन",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "/images/ranchi-kalash-procession.jpg",
      personOrPlace: "सुवर्णरेखा घाट, नामकुम रांची",
      category: "program",
      state: "jharkhand",
      district: "रांची",
      duration: "16:30 Min",
      viewsCount: "15.9K",
      date: "28 फरवरी 2024",
      description:
        "झारखंड के विभिन्न जिलों से पधारे समाजबंधुओं ने जल संरक्षण और सांस्कृतिक एकता की शपथ ली।",
      tag: "कार्यक्रम",
      order: 5,
    },
    {
      title: "लखनऊ में युवा शक्ति संवाद — शिक्षा, अधिकार और स्वाभिमान का पावन संकल्प",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "/images/ghat-kalash-procession.jpg",
      personOrPlace: "युवा मोर्चा सम्मेलन, हजरतगंज लखनऊ",
      category: "speech",
      state: "uttar-pradesh",
      district: "लखनऊ",
      duration: "21:05 Min",
      viewsCount: "29.4K",
      date: "10 मार्च 2024",
      description:
        "नई पीढ़ी को उच्च शिक्षा, प्रशासनिक सेवाओं व आत्मनिर्भरता से जोड़ने हेतु विस्तृत कार्ययोजना पर संबोधन।",
      tag: "संबोधन",
      order: 6,
    },
  ],

  pillarsSection: {
    kicker: "पावन धरोहर एवं सामाजिक जागरण • महा-संकल्प दर्शन",
    title: "कलश यात्रा के चार महा-संकल्प — ",
    titleAccent: "आस्था, संस्कार और स्वाभिमान",
    subtitle:
      "पवित्र नदियों के जल से समाज में समरसता, मातृशक्ति का सम्मान और भावी पीढ़ी के उज्ज्वल भविष्य का पावन जन-अभियान। जानें इस आंदोलन के मूल आदर्श।",
    storyCollage: {
      primaryCard: {
        image: "/images/ghat-kalash-procession.jpg",
        badge: "गंगा व पावन नदियों का संगम",
        title: "जल शुद्धि एवं सनातन संस्कृति का पुनर्जागरण",
        desc: "पवित्र घाटों पर सूर्योदय के समय माताओं-बहनों द्वारा वैदिक मंत्रोच्चार के साथ कलश पूजन का अलौकिक दृश्य।",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      subCard1: {
        image: "/images/sacred-kalash-ritual.jpg",
        tag: "🪔 वैदिक अनुष्ठान",
        title: "मंगल कलश स्थापन",
        desc: "आम्रपल्लव, श्रीफल व पावन जल",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      subCard2: {
        image: "/images/kalash-yatra-featured.jpg",
        tag: "🚩 ऐतिहासिक रैली",
        title: "स्वाभिमान का शंखनाद",
        desc: "150+ जिलों में एकता का संगम",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
    },
    pillars: [
      {
        number: "01",
        iconKey: "water",
        title: "पवित्र जल एवं पर्यावरण संरक्षण संकल्प",
        description:
          "गंगा, सरयू, नर्मदा व गंडक जैसी पावन नदियों के जल को साक्षी मानकर जलस्रोतों के संरक्षण, स्वच्छता और पर्यावरण संतुलन का सामूहिक प्रण लेना।",
        order: 1,
      },
      {
        number: "02",
        iconKey: "women",
        title: "मातृशक्ति का गौरव एवं सशक्तिकरण",
        description:
          "कलश यात्रा में घर-परिवार की माताओं, बहनों और बेटियों की प्रथम पंक्ति में भागीदारी, जो समाज में नारी नेतृत्व और सम्मान का प्रत्यक्ष उदाहरण है।",
        order: 2,
      },
      {
        number: "03",
        iconKey: "unity",
        title: "सामाजिक समरसता व अखंड एकजुटता",
        description:
          "गांव, कस्बों और राज्यों के बंधनों से परे समाज के हर वर्ग को एक धागे में पिरोकर आपसी सहयोग, बंधुत्व और संगठित शक्ति की नींव रखना।",
        order: 3,
      },
      {
        number: "04",
        iconKey: "education",
        title: "शिक्षा, संस्कार और स्वावलंबन की राह",
        description:
          "नई पीढ़ी को अपनी गौरवशाली ऐतिहासिक पहचान से जोड़ना, उच्च शिक्षा के प्रति जागरूक करना और आत्मनिर्भर समाज निर्माण के लिए प्रेरित करना।",
        order: 4,
      },
    ],
  },
};

const kalashYatraSchema = new mongoose.Schema(
  {
    hero: {
      liveBadgeText: { type: String, default: defaultKalashYatraData.hero.liveBadgeText },
      headingMain: { type: String, default: defaultKalashYatraData.hero.headingMain },
      headingHighlight: { type: String, default: defaultKalashYatraData.hero.headingHighlight },
      subheading: { type: String, default: defaultKalashYatraData.hero.subheading },
      highlights: [{ type: String }],
      primaryBtnText: { type: String, default: defaultKalashYatraData.hero.primaryBtnText },
      primaryBtnLink: { type: String, default: defaultKalashYatraData.hero.primaryBtnLink },
      secondaryBtnText: { type: String, default: defaultKalashYatraData.hero.secondaryBtnText },
      secondaryBtnLink: { type: String, default: defaultKalashYatraData.hero.secondaryBtnLink },
      stats: [
        {
          number: { type: String, default: "" },
          label: { type: String, default: "" },
          sub: { type: String, default: "" },
        },
      ],
      featuredVideo: {
        title: { type: String, default: defaultKalashYatraData.hero.featuredVideo.title },
        duration: { type: String, default: defaultKalashYatraData.hero.featuredVideo.duration },
        videoUrl: { type: String, default: defaultKalashYatraData.hero.featuredVideo.videoUrl },
        posterImage: { type: String, default: defaultKalashYatraData.hero.featuredVideo.posterImage },
        badge: { type: String, default: defaultKalashYatraData.hero.featuredVideo.badge },
      },
    },

    milestonesSection: {
      kicker: { type: String, default: defaultKalashYatraData.milestonesSection.kicker },
      title: { type: String, default: defaultKalashYatraData.milestonesSection.title },
      titleHighlight: { type: String, default: defaultKalashYatraData.milestonesSection.titleHighlight },
      subtitle: { type: String, default: defaultKalashYatraData.milestonesSection.subtitle },
      items: [
        {
          stateKey: { type: String, default: "bihar" },
          stateName: { type: String, default: "" },
          district: { type: String, default: "" },
          title: { type: String, default: "" },
          image: { type: String, default: "" },
          description: { type: String, default: "" },
          tag: { type: String, default: "" },
          videoUrl: { type: String, default: "" },
          order: { type: Number, default: 0 },
        },
      ],
    },

    videos: [
      {
        title: { type: String, required: true },
        videoUrl: { type: String, required: true },
        thumbnail: { type: String, default: "" },
        personOrPlace: { type: String, default: "" },
        category: {
          type: String,
          enum: ["all", "yatra", "program", "speech"],
          default: "yatra",
        },
        state: { type: String, default: "bihar" },
        district: { type: String, default: "" },
        duration: { type: String, default: "10:00 Min" },
        viewsCount: { type: String, default: "10K" },
        date: { type: String, default: "" },
        description: { type: String, default: "" },
        tag: { type: String, default: "कलश यात्रा" },
        order: { type: Number, default: 0 },
      },
    ],

    pillarsSection: {
      kicker: { type: String, default: defaultKalashYatraData.pillarsSection.kicker },
      title: { type: String, default: defaultKalashYatraData.pillarsSection.title },
      titleAccent: { type: String, default: defaultKalashYatraData.pillarsSection.titleAccent },
      subtitle: { type: String, default: defaultKalashYatraData.pillarsSection.subtitle },
      storyCollage: {
        primaryCard: {
          image: { type: String, default: "" },
          badge: { type: String, default: "" },
          title: { type: String, default: "" },
          desc: { type: String, default: "" },
          videoUrl: { type: String, default: "" },
        },
        subCard1: {
          image: { type: String, default: "" },
          tag: { type: String, default: "" },
          title: { type: String, default: "" },
          desc: { type: String, default: "" },
          videoUrl: { type: String, default: "" },
        },
        subCard2: {
          image: { type: String, default: "" },
          tag: { type: String, default: "" },
          title: { type: String, default: "" },
          desc: { type: String, default: "" },
          videoUrl: { type: String, default: "" },
        },
      },
      pillars: [
        {
          number: { type: String, default: "" },
          iconKey: { type: String, default: "water" },
          title: { type: String, default: "" },
          description: { type: String, default: "" },
          order: { type: Number, default: 0 },
        },
      ],
    },
  },
  { timestamps: true }
);

// Static helper to get existing doc or seed if empty
kalashYatraSchema.statics.getOrSeed = async function () {
  let doc = await this.findOne();
  if (!doc) {
    doc = await this.create(defaultKalashYatraData);
    console.log("🌱 Default Kalash Yatra content seeded successfully.");
  }
  return doc;
};

kalashYatraSchema.statics.defaultData = defaultKalashYatraData;

module.exports = mongoose.model("KalashYatra", kalashYatraSchema);
