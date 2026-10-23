/**
 * भारत के सभी राज्यों, केंद्रशासित प्रदेशों और उनके जिलों की सूची।
 */

const INDIA_STATES_DISTRICTS = {
  "उत्तर प्रदेश": [
    "आगरा", "अलीगढ़", "अम्बेडकर नगर", "अमेठी", "अमरोहा", "औरैया", "अयोध्या", "आजमगढ़",
    "बागपत", "बहराइच", "बलिया", "बलरामपुर", "बांदा", "बाराबंकी", "बरेली", "बस्ती",
    "बिजनौर", "बदायूँ", "बुलंदशहर", "चंदौली", "चित्रकूट", "देवरिया", "एटा", "इटावा",
    "फर्रुखाबाद", "फतेहपुर", "फिरोजाबाद", "गौतम बुद्ध नगर", "गाजियाबाद", "गाजीपुर",
    "गोंडा", "गोरखपुर", "हमीरपुर", "हापुड़", "हरदोई", "हाथरस", "जालौन", "जौनपुर",
    "झाँसी", "कन्नौज", "कानपुर देहात", "कानपुर नगर", "कासगंज", "कौशाम्बी", "कुशीनगर",
    "लखीमपुर खीरी", "ललितपुर", "लखनऊ", "महाराजगंज", "महोबा", "मैनपुरी", "मथुरा",
    "मऊ", "मेरठ", "मिर्जापुर", "मुरादाबाद", "मुजफ्फरनगर", "पीलीभीत", "प्रतापगढ़",
    "प्रयागराज", "रायबरेली", "रामपुर", "सहारनपुर", "सम्भल", "संत कबीर नगर",
    "संत रविदास नगर (भदोही)", "शाहजहाँपुर", "शामली", "श्रावस्ती", "सिद्धार्थनगर",
    "सीतापुर", "सोनभद्र", "सुल्तानपुर", "उन्नाव", "वाराणसी"
  ],

  "बिहार": [
    "अररिया", "अरवल", "औरंगाबाद", "बाँका", "बेगूसराय", "भागलपुर", "भोजपुर", "बक्सर",
    "दरभंगा", "पूर्वी चंपारण", "गया", "गोपालगंज", "जमुई", "जहानाबाद", "कैमूर",
    "कटिहार", "खगड़िया", "किशनगंज", "लखीसराय", "मधेपुरा", "मधुबनी", "मुंगेर",
    "मुजफ्फरपुर", "नालंदा", "नवादा", "पटना", "पूर्णिया", "रोहतास", "सहरसा", "समस्तीपुर",
    "सारण", "शेखपुरा", "शिवहर", "सीतामढ़ी", "सिवान", "सुपौल", "वैशाली", "पश्चिमी चंपारण"
  ],

  // "मध्य प्रदेश": [
  //   "आगर मालवा", "अलीराजपुर", "अनूपपुर", "अशोकनगर", "बालाघाट", "बड़वानी", "बैतूल", "भिंड",
  //   "भोपाल", "बुरहानपुर", "छतरपुर", "छिंदवाड़ा", "दमोह", "दतिया", "देवास", "धार",
  //   "डिंडौरी", "गुना", "ग्वालियर", "हरदा", "नर्मदापुरम (होशंगाबाद)", "इंदौर", "जबलपुर",
  //   "झाबुआ", "कटनी", "खंडवा", "खरगोन", "मैहर", "मंडला", "मंदसौर", "मऊगंज",
  //   "मुरैना", "नरसिंहपुर", "नीमच", "निवाड़ी", "पांढुर्णा", "पन्ना", "रायसेन", "राजगढ़",
  //   "रतलाम", "रीवा", "सागर", "सतना", "सीहोर", "सिवनी", "शहडोल", "शाजापुर", "श्योपुर",
  //   "शिवपुरी", "सीधी", "सिंगरौली", "टीकमगढ़", "उज्जैन", "उमरिया", "विदिशा"
  // ],

  // "झारखंड": [
  //   "बोकारो", "चतरा", "देवघर", "धनबाद", "दुमका", "पूर्वी सिंहभूम", "गढ़वा", "गिरिडीह",
  //   "गोड्डा", "गुमला", "हजारीबाग", "जामताड़ा", "खूंटी", "कोडरमा", "लातेहार", "लोहरदगा",
  //   "पाकुड़", "पलामू", "रामगढ़", "राँची", "साहिबगंज", "सरायकेला-खरसावाँ", "सिमडेगा", "पश्चिमी सिंहभूम"
  // ],


  // "तमिलनाडु": [
  //   "अरियालुर", "चेंगलपट्टू", "चेन्नई", "कोयंबटूर", "कडलूर", "धर्मपुरी", "डिंडीगुल",
  //   "इरोड", "कल्लाकुरिची", "कांचीपुरम", "कन्याकुमारी", "करूर", "कृष्णागिरि", "मदुरै",
  //   "मयिलादुतुरै", "नागपट्टिनम", "नमक्कल", "नीलगिरि", "पेरम्बलूर", "पुदुक्कोट्टई",
  //   "रामनाथपुरम", "रानीपेट", "सेलम", "शिवगंगा", "तेनकासी", "तंजावुर", "थेनी",
  //   "तूतीकोरिन", "तिरुचिरापल्ली", "तिरुनेलवेली", "तिरुपत्तूर", "तिरुप्पुर", "तिरुवल्लूर",
  //   "तिरुवन्नामलाई", "तिरुवारूर", "वेल्लोर", "विल्लुपुरम", "विरुधुनगर"
  // ],


};


// सभी राज्यों और केंद्रशासित प्रदेशों की सूची प्राप्त करें।
const getStatesList = () => Object.keys(INDIA_STATES_DISTRICTS);

// चुने गए राज्य के सभी जिले प्राप्त करें।
const getDistrictsForState = (stateName) => {
  if (!stateName || stateName === "all") return [];
  // Direct Hindi lookup
  if (INDIA_STATES_DISTRICTS[stateName]) {
    return INDIA_STATES_DISTRICTS[stateName];
  }
  // Lookup via English alias
  const normalized = stateName.trim().toLowerCase();
  for (const [hindiState, aliases] of Object.entries(STATE_ALIASES)) {
    if (aliases.some(a => a.toLowerCase() === normalized)) {
      return INDIA_STATES_DISTRICTS[hindiState] || [];
    }
  }
  return [];
};

// राज्य और अंग्रेजी/उपनाम मैपिंग
const STATE_ALIASES = {
  "उत्तर प्रदेश": ["उत्तर प्रदेश", "Uttar Pradesh", "uttar-pradesh", "UP", "U.P."],
  "बिहार": ["बिहार", "Bihar", "bihar"],
  "मध्य प्रदेश": ["मध्य प्रदेश", "Madhya Pradesh", "madhya-pradesh", "MP", "M.P."],
  "झारखंड": ["झारखंड", "Jharkhand", "jharkhand"],
  "दिल्ली": ["दिल्ली", "Delhi", "delhi", "New Delhi"],
  "राजस्थान": ["राजस्थान", "Rajasthan", "rajasthan"],
  "हरियाणा": ["हरियाणा", "Haryana", "haryana"],
  "उत्तराखंड": ["उत्तराखंड", "Uttarakhand", "uttarakhand"],
  "पंजाब": ["पंजाब", "Punjab", "punjab"],
  "महाराष्ट्र": ["महाराष्ट्र", "Maharashtra", "maharashtra"],
  "गुजरात": ["गुजरात", "Gujarat", "gujarat"],
  "पश्चिम बंगाल": ["पश्चिम बंगाल", "West Bengal", "west-bengal"],
  "छत्तीसगढ़": ["छत्तीसगढ़", "Chhattisgarh", "chhattisgarh"],
  "ओडिशा": ["ओडिशा", "Odisha", "odisha", "Orissa"],
  "हिमाचल प्रदेश": ["हिमाचल प्रदेश", "Himachal Pradesh", "himachal-pradesh"],
  "जम्मू और कश्मीर": ["जम्मू और कश्मीर", "Jammu and Kashmir", "jammu-and-kashmir", "J&K"],
  "आंध्र प्रदेश": ["आंध्र प्रदेश", "Andhra Pradesh", "andhra-pradesh"],
  "असम": ["असम", "Assam", "assam"],
  "कर्नाटक": ["कर्नाटक", "Karnataka", "karnataka"],
  "केरल": ["केरल", "Kerala", "kerala"],
  "तमिलनाडु": ["तमिलनाडु", "Tamil Nadu", "tamil-nadu"],
  "तेलंगाना": ["तेलंगाना", "Telangana", "telangana"],
  "गोवा": ["गोवा", "Goa", "goa"],
};

// सामान्य जिले उपनाम
const DISTRICT_ALIASES = {
  // उत्तर प्रदेश के प्रमुख जिले
  "भदोही": ["भदोही", "Bhadohi", "Sant Ravidas Nagar (Bhadohi)", "Sant Ravidas Nagar"],
  "संत रविदास नगर (भदोही)": ["भदोही", "Bhadohi", "Sant Ravidas Nagar (Bhadohi)", "Sant Ravidas Nagar"],
  "वाराणसी": ["वाराणसी", "Varanasi", "Banaras", "Kashi"],
  "प्रयागराज": ["प्रयागराज", "Prayagraj", "Allahabad"],
  "अयोध्या": ["अयोध्या", "Ayodhya", "Faizabad"],
  "गोरखपुर": ["गोरखपुर", "Gorakhpur"],
  "मिर्जापुर": ["मिर्जापुर", "Mirzapur"],
  "बलिया": ["बलिया", "Ballia", "Balia"],
  "बरेली": ["बरेली", "Bareilly"],
  "महाराजगंज": ["महाराजगंज", "Maharajganj", "Mahrajganj"],
  "जौनपुर": ["जौनपुर", "Jaunpur"],
  "गाजीपुर": ["गाजीपुर", "Ghazipur"],
  "चंदौली": ["चंदौली", "Chandauli"],
  "सोनभद्र": ["सोनभद्र", "Sonbhadra", "Sonebhadra"],
  "आगरा": ["आगरा", "Agra"],
  "अलीगढ़": ["अलीगढ़", "Aligarh"],
  "अम्बेडकर नगर": ["अम्बेडकर नगर", "Ambedkar Nagar"],
  "अमेठी": ["अमेठी", "Amethi"],
  "अमरोहा": ["अमरोहा", "Amroha"],
  "औरैया": ["औरैया", "Auraiya"],
  "आजमगढ़": ["आजमगढ़", "Azamgarh"],
  "बागपत": ["बागपत", "Baghpat"],
  "बहराइच": ["बहराइच", "Bahraich"],
  "बलरामपुर": ["बलरामपुर", "Balrampur"],
  "बांदा": ["बांदा", "Banda"],
  "बाराबंकी": ["बाराबंकी", "Barabanki"],
  "बस्ती": ["बस्ती", "Basti"],
  "बिजनौर": ["बिजनौर", "Bijnor"],
  "बदायूँ": ["बदायूँ", "Budaun", "Badaun"],
  "बुलंदशहर": ["बुलंदशहर", "Bulandshahr"],
  "चित्रकूट": ["चित्रकूट", "Chitrakoot"],
  "देवरिया": ["देवरिया", "Deoria"],
  "एटा": ["एटा", "Etah"],
  "इटावा": ["इटावा", "Etawah"],
  "फर्रुखाबाद": ["फर्रुखाबाद", "Farrukhabad"],
  "फतेहपुर": ["फतेहपुर", "Fatehpur"],
  "फिरोजाबाद": ["फिरोजाबाद", "Firozabad"],
  "गौतम बुद्ध नगर": ["गौतम बुद्ध नगर", "Gautam Buddha Nagar", "Noida", "Greater Noida"],
  "गाजियाबाद": ["गाजियाबाद", "Ghaziabad"],
  "गोंडा": ["गोंडा", "Gonda"],
  "हमीरपुर": ["हमीरपुर", "Hamirpur"],
  "हापुड़": ["हापुड़", "Hapur"],
  "हरदोई": ["हरदोई", "Hardoi"],
  "हाथरस": ["हाथरस", "Hathras"],
  "जालौन": ["जालौन", "Jalaun"],
  "झाँसी": ["झाँसी", "Jhansi"],
  "कन्नौज": ["कन्नौज", "Kannauj"],
  "कानपुर देहात": ["कानपुर देहात", "Kanpur Dehat"],
  "कानपुर नगर": ["कानपुर नगर", "Kanpur", "Kanpur Nagar"],
  "कासगंज": ["कासगंज", "Kasganj"],
  "कौशाम्बी": ["कौशाम्बी", "Kaushambi"],
  "कुशीनगर": ["कुशीनगर", "Kushinagar"],
  "लखीमपुर खीरी": ["लखीमपुर खीरी", "Lakhimpur Kheri", "Kheri"],
  "ललितपुर": ["ललितपुर", "Lalitpur"],
  "लखनऊ": ["लखनऊ", "Lucknow"],
  "महोबा": ["महोबा", "Mahoba"],
  "मैनपुरी": ["मैनपुरी", "Mainpuri"],
  "मथुरा": ["मथुरा", "Mathura"],
  "मऊ": ["मऊ", "Mau"],
  "मेरठ": ["मेरठ", "Meerut"],
  "मुरादाबाद": ["मुरादाबाद", "Moradabad"],
  "मुजफ्फरनगर": ["मुजफ्फरनगर", "Muzaffarnagar"],
  "पीलीभीत": ["पीलीभीत", "Pilibhit"],
  "प्रतापगढ़": ["प्रतापगढ़", "Pratapgarh"],
  "रायबरेली": ["रायबरेली", "Rae Bareli", "Raebareli"],
  "रामपुर": ["रामपुर", "Rampur"],
  "सहारनपुर": ["सहारनपुर", "Saharanpur"],
  "सम्भल": ["सम्भल", "Sambhal"],
  "संत कबीर नगर": ["संत कबीर नगर", "Sant Kabir Nagar"],
  "शाहजहाँपुर": ["शाहजहाँपुर", "Shahjahanpur"],
  "शामली": ["शामली", "Shamli"],
  "श्रावस्ती": ["श्रावस्ती", "Shravasti"],
  "सिद्धार्थनगर": ["सिद्धार्थनगर", "Siddharthnagar", "Siddharth Nagar"],
  "सीतापुर": ["सीतापुर", "Sitapur"],
  "सोनभद्र": ["सोनभद्र", "Sonbhadra", "Sonebhadra"],
  "सुल्तानपुर": ["सुल्तानपुर", "Sultanpur"],
  "उन्नाव": ["उन्नाव", "Unnao"],

  // बिहार के प्रमुख जिले
  "पटना": ["पटना", "Patna"],
  "गया": ["गया", "Gaya"],
  "भागलपुर": ["भागलपुर", "Bhagalpur"],
  "मुजफ्फरपुर": ["मुजफ्फरपुर", "Muzaffarpur"],
  "दरभंगा": ["दरभंगा", "Darbhanga"],
  "पूर्णिया": ["पूर्णिया", "Purnia"],
  "रोहतास": ["रोहतास", "Rohtas"],
  "सारण": ["सारण", "Saran", "Chhapra"],
  "सिवान": ["सिवान", "Siwan"],
  "वैशाली": ["वैशाली", "Vaishali", "Hajipur"],
  "समस्तीपुर": ["समस्तीपुर", "Samastipur"],
  "बेगूसराय": ["बेगूसराय", "Begusarai"],
  "कटिहार": ["कटिहार", "Katihar"],
  "नालंदा": ["नालंदा", "Nalanda", "Bihar Sharif"],
  "भोजपुर": ["भोजपुर", "Bhojpur", "Arrah"],
  "बक्सर": ["बक्सर", "Buxar"],
  "औरंगाबाद": ["औरंगाबाद", "Aurangabad"],
  "नवादा": ["नवादा", "Nawada"],
  "जहानाबाद": ["जहानाबाद", "Jehanabad"],
  "गोपालगंज": ["गोपालगंज", "Gopalganj"],
  "पूर्वी चंपारण": ["पूर्वी चंपारण", "East Champaran", "Motihari"],
  "पश्चिमी चंपारण": ["पश्चिमी चंपारण", "West Champaran", "Bettiah"],

  // अन्य प्रमुख शहर/जिले
  "राँची": ["राँची", "Ranchi"],
  "भोपाल": ["भोपाल", "Bhopal"],
  "इंदौर": ["इंदौर", "Indore"],
  "ग्वालियर": ["ग्वालियर", "Gwalior"],
  "जबलपुर": ["जबलपुर", "Jabalpur"],
  "उज्जैन": ["उज्जैन", "Ujjain"],
  "जयपुर": ["जयपुर", "Jaipur"],
  "जोधपुर": ["जोधपुर", "Jodhpur"],
  "कोटा": ["कोटा", "Kota"],
  "अजमेर": ["अजमेर", "Ajmer"],
  "उदयपुर": ["उदयपुर", "Udaipur"],
  "चंडीगढ़": ["चंडीगढ़", "Chandigarh"],
  "देहरादून": ["देहरादून", "Dehradun"],
  "हरिद्वार": ["हरिद्वार", "Haridwar"],
  "नैनीताल": ["नैनीताल", "Nainital"]
};

function escapeRegex(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// MongoDB Query for State (matches both Hindi & English)
const buildStateMongoQuery = (stateName) => {
  if (!stateName || stateName === "all") return null;
  const trimmed = stateName.trim();
  let aliases = STATE_ALIASES[trimmed];
  if (!aliases) {
    const lower = trimmed.toLowerCase();
    for (const [, list] of Object.entries(STATE_ALIASES)) {
      if (list.some(a => a.toLowerCase() === lower)) {
        aliases = list;
        break;
      }
    }
  }
  aliases = aliases || [trimmed];
  const regexList = aliases.map(a => new RegExp("^\\s*" + escapeRegex(a) + "\\s*$", "i"));
  return { $in: regexList };
};

// MongoDB Query for District (matches both Hindi & English)
const buildDistrictMongoQuery = (districtName) => {
  if (!districtName || districtName === "all") return null;
  const trimmed = districtName.trim();
  let aliases = DISTRICT_ALIASES[trimmed];
  if (!aliases) {
    const lower = trimmed.toLowerCase();
    for (const [, list] of Object.entries(DISTRICT_ALIASES)) {
      if (list.some(d => d.toLowerCase() === lower)) {
        aliases = list;
        break;
      }
    }
  }
  aliases = aliases || [trimmed];
  const regexList = aliases.map(d => new RegExp("^\\s*" + escapeRegex(d) + "\\s*$", "i"));
  return { $in: regexList };
};

// जिले के नाम से संबंधित राज्य खोजें।
const findStateForDistrict = (districtName) => {
  if (!districtName || typeof districtName !== "string") return "";

  const dNorm = districtName.trim().toLowerCase();

  for (const [state, districts] of Object.entries(INDIA_STATES_DISTRICTS)) {
    if (districts.some((district) => district.toLowerCase() === dNorm)) {
      return state;
    }
  }

  return "";
};

// राज्य का मानक हिंदी नाम प्राप्त करें
const getStandardHindiState = (stateName) => {
  if (!stateName || stateName === "all") return "";
  const trimmed = stateName.trim();
  if (INDIA_STATES_DISTRICTS[trimmed]) return trimmed;
  const lower = trimmed.toLowerCase();
  for (const [hindiState, aliases] of Object.entries(STATE_ALIASES)) {
    if (aliases.some((a) => a.toLowerCase() === lower)) {
      return hindiState;
    }
  }
  return trimmed;
};

// जिले का मानक हिंदी नाम प्राप्त करें
const getStandardHindiDistrict = (districtName) => {
  if (!districtName || districtName === "all") return "";
  const trimmed = districtName.trim();
  if (DISTRICT_ALIASES[trimmed]) return trimmed;
  const lower = trimmed.toLowerCase();
  for (const [hindiDistrict, aliases] of Object.entries(DISTRICT_ALIASES)) {
    if (aliases.some((d) => d.toLowerCase() === lower)) {
      return hindiDistrict;
    }
  }
  return trimmed;
};

// अन्य फ़ाइलों में उपयोग करने के लिए निर्यात करें।
module.exports = {
  INDIA_STATES_DISTRICTS,
  STATE_ALIASES,
  DISTRICT_ALIASES,
  getStatesList,
  getDistrictsForState,
  getStandardHindiState,
  getStandardHindiDistrict,
  findStateForDistrict,
  buildStateMongoQuery,
  buildDistrictMongoQuery
};