const SankalpPhoto = require("../models/SankalpPhoto");

const defaultGalleryPhotos = [
  {
    name: "Ramvriksh Nishad",
    district: "Gorakhpur",
    date: new Date("2026-09-20"),
    dateString: "September 20, 2026",
    caption: "Sacred pledge taken for community solidarity and youth empowerment.",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
    isPublished: true,
    order: 1,
  },
  {
    name: "Suresh Kashyap",
    district: "Varanasi",
    date: new Date("2026-09-22"),
    dateString: "September 22, 2026",
    caption: "Mega pledge taken on Dashashwamedh Ghat for community unity and river conservation.",
    imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80",
    isPublished: true,
    order: 2,
  },
  {
    name: "Amit Kumar Bind",
    district: "Prayagraj",
    date: new Date("2026-09-23"),
    dateString: "September 23, 2026",
    caption: "Pledge taken at Sangam banks to educate and unite talented youth.",
    imageUrl: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1000&q=80",
    isPublished: true,
    order: 3,
  },
  {
    name: "Dinesh Mallah",
    district: "Ayodhya",
    date: new Date("2026-09-24"),
    dateString: "September 24, 2026",
    caption: "Collective pledge on Saryu banks to follow the noble ideals of Nishadraj Guhya.",
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
    isPublished: true,
    order: 4,
  },
  {
    name: "Rajesh Sahani",
    district: "Ghazipur",
    date: new Date("2026-09-25"),
    dateString: "September 25, 2026",
    caption: "Submitting pledge forms for village-level educational forums and de-addiction awareness.",
    imageUrl: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1000&q=80",
    isPublished: true,
    order: 5,
  },
  {
    name: "Sunil Kewat",
    district: "Mirzapur",
    date: new Date("2026-09-26"),
    dateString: "September 26, 2026",
    caption: "Solemn pledge for community upliftment and dedicated social service in the sanctuary of Maa Vindhyavasini.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    isPublished: true,
    order: 6,
  },
  {
    name: "Vikas Kashyap",
    district: "Lucknow",
    date: new Date("2026-09-27"),
    dateString: "September 27, 2026",
    caption: "Comrades completing pledge forms during the Youth Convention in the state capital.",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1000&q=80",
    isPublished: true,
    order: 7,
  },
  {
    name: "Pankaj Nishad",
    district: "Ballia",
    date: new Date("2026-09-28"),
    dateString: "September 28, 2026",
    caption: "Youth in revolutionary Ballia taking a pledge for self-reliance and entrepreneurship.",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
    isPublished: true,
    order: 8,
  },
  {
    name: "Mahendra Dheevar",
    district: "Kanpur",
    date: new Date("2026-09-28"),
    dateString: "September 28, 2026",
    caption: "Collective pledge assembly of community elders and youth at Ganga Barrage.",
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
