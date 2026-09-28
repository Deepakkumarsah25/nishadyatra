const SankalpPhoto = require("../models/SankalpPhoto");
const HomeQuickInfo = require("../models/HomeQuickInfo");
const { defaultGalleryPhotos, seedGalleryData } = require("../scripts/seedGalleryData");

// Public Gallery Page
exports.getGalleryPage = async (req, res) => {
  try {
    const { district } = req.query;

    const query = { isPublished: true };
    if (district && district.trim() && district !== "all") {
      query.district = district.trim();
    }

    let [photos, quickInfo, districtsWithCount] = await Promise.all([
      SankalpPhoto.find(query).sort({ order: 1, date: -1, createdAt: -1 }),
      HomeQuickInfo.findOne(),
      SankalpPhoto.aggregate([
        { $match: { isPublished: true } },
        { $group: { _id: "$district", count: { $sum: 1 } } },
        { $sort: { count: -1, _id: 1 } },
      ]),
    ]);

    // If completely empty, auto-seed and reload
    if (!photos || photos.length === 0) {
      const totalInDb = await SankalpPhoto.countDocuments();
      if (totalInDb === 0) {
        await seedGalleryData();
        photos = await SankalpPhoto.find(query).sort({ order: 1, date: -1 });
        districtsWithCount = await SankalpPhoto.aggregate([
          { $match: { isPublished: true } },
          { $group: { _id: "$district", count: { $sum: 1 } } },
          { $sort: { count: -1, _id: 1 } },
        ]);
      }
    }

    const totalPhotos = await SankalpPhoto.countDocuments({ isPublished: true });

    res.render("gallery", {
      title: "संकल्प फोटो — Image Gallery",
      photos: photos && photos.length > 0 ? photos : defaultGalleryPhotos,
      selectedDistrict: district || "all",
      districtsWithCount: districtsWithCount || [],
      totalPhotos: totalPhotos || defaultGalleryPhotos.length,
      quickInfo: quickInfo || {},
    });
  } catch (error) {
    console.error("Gallery render error:", error);
    res.render("gallery", {
      title: "संकल्प फोटो — Image Gallery",
      photos: defaultGalleryPhotos,
      selectedDistrict: "all",
      districtsWithCount: [],
      totalPhotos: defaultGalleryPhotos.length,
      quickInfo: {},
    });
  }
};

// API: Filtered photos JSON
exports.getGalleryApi = async (req, res) => {
  try {
    const { district, search } = req.query;
    const query = { isPublished: true };

    if (district && district.trim() && district !== "all") {
      query.district = district.trim();
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      query.$or = [{ name: regex }, { district: regex }, { caption: regex }];
    }

    const photos = await SankalpPhoto.find(query).sort({
      order: 1,
      date: -1,
      createdAt: -1,
    });

    res.json({
      success: true,
      count: photos.length,
      photos,
    });
  } catch (error) {
    console.error("Gallery API error:", error);
    res.status(500).json({ success: false, message: "Error fetching photos" });
  }
};
