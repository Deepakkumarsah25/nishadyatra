const SankalpPhoto = require("../models/SankalpPhoto");

const defaultGalleryPhotos = [
  {
    name: "रामवृक्ष निषाद",
    district: "गोरखपुर",
    date: new Date("2026-09-20"),
    dateString: "20 सितम्बर 2026",
    caption: "अखंड समाज व युवाओं के स्वाभिमान हेतु लिया गया पावन संकल्प।",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
    isPublished: true,
    order: 1,
  },
  {
    name: "सुरेश कश्यप",
    district: "वाराणसी",
    date: new Date("2026-09-22"),
    dateString: "22 सितम्बर 2026",
    caption: "दशाश्वमेध घाट पर गंगा पुत्रों द्वारा एकता एवं नदी संरक्षण का महासंकल्प।",
    imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80",
    isPublished: true,
    order: 2,
  },
  {
    name: "अमित कुमार बिंद",
    district: "प्रयागराज",
    date: new Date("2026-09-23"),
    dateString: "23 सितम्बर 2026",
    caption: "संगम तट पर समाज के मेधावी युवाओं को शिक्षित व संगठित करने का संकल्प।",
    imageUrl: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1000&q=80",
    isPublished: true,
    order: 3,
  },
  {
    name: "दिनेश मल्लाह",
    district: "अयोध्या",
    date: new Date("2026-09-24"),
    dateString: "24 सितम्बर 2026",
    caption: "सरयू तट पर निषादराज गुह्य जी के आदर्शों पर चलने का सामूहिक संकल्प।",
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
    isPublished: true,
    order: 4,
  },
  {
    name: "राजेश साहनी",
    district: "गाज़ीपुर",
    date: new Date("2026-09-25"),
    dateString: "25 सितम्बर 2026",
    caption: "गाँव-गाँव में शिक्षा चौपाल व नशामुक्ति का संकल्प पत्र सौंपते हुए।",
    imageUrl: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1000&q=80",
    isPublished: true,
    order: 5,
  },
  {
    name: "सुनील केवट",
    district: "मीरजापुर",
    date: new Date("2026-09-26"),
    dateString: "26 सितम्बर 2026",
    caption: "मां विंध्यवासिनी के पावन आंचल में समाज उत्थान एवं सेवा का दृढ़ संकल्प।",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    isPublished: true,
    order: 6,
  },
  {
    name: "विकास कश्यप",
    district: "लखनऊ",
    date: new Date("2026-09-27"),
    dateString: "27 सितम्बर 2026",
    caption: "राजधानी लखनऊ में युवा सम्मेलन के दौरान संकल्प पत्र भरते हुए साथीगण।",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1000&q=80",
    isPublished: true,
    order: 7,
  },
  {
    name: "पंकज निषाद",
    district: "बलिया",
    date: new Date("2026-09-28"),
    dateString: "28 सितम्बर 2026",
    caption: "क्रांतिधरा बलिया में नौजवानों ने स्वावलंबन और स्वरोजगार का लिया संकल्प।",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
    isPublished: true,
    order: 8,
  },
  {
    name: "महेंद्र धीवर",
    district: "कानपुर",
    date: new Date("2026-09-28"),
    dateString: "28 सितम्बर 2026",
    caption: "गंगा बैराज पर समाज के वरिष्ठ जनों एवं युवाओं की सामूहिक संकल्प सभा।",
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80",
    isPublished: true,
    order: 9,
  }
];

const seedGalleryData = async () => {
  try {
    const count = await SankalpPhoto.countDocuments();
    if (count === 0) {
      await SankalpPhoto.insertMany(defaultGalleryPhotos);
      console.log("🌱 Default Sankalp Photo Gallery data seeded successfully!");
    }
  } catch (error) {
    console.error("❌ Gallery data seed error:", error.message);
  }
};

module.exports = {
  seedGalleryData,
  defaultGalleryPhotos,
};
