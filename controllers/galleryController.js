const SankalpPhoto = require("../models/SankalpPhoto");
const HomeQuickInfo = require("../models/HomeQuickInfo");
const { defaultGalleryPhotos, seedGalleryData } = require("../scripts/seedGalleryData");
const { getPagination } = require("../utils/pagination");

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Public Gallery Page
exports.getGalleryPage = async (req, res) => {
  try {
    const { district } = req.query;
    const search = typeof req.query.search === "string" ? req.query.search.trim().slice(0, 100) : "";

    const query = { isPublished: true };
    if (typeof district === "string" && district.trim() && district !== "all") {
      query.district = district.trim();
    }
    if (search) {
      const regex = new RegExp(escapeRegex(search), "i");
      query.$or = [{ name: regex }, { district: regex }, { caption: regex }];
    }

    let [total, quickInfo, districtsWithCount] = await Promise.all([
      SankalpPhoto.countDocuments(query),
      HomeQuickInfo.findOne(),
      SankalpPhoto.aggregate([
        { $match: { isPublished: true } },
        { $group: { _id: "$district", count: { $sum: 1 } } },
        { $sort: { count: -1, _id: 1 } },
        { $limit: 200 },
      ]),
    ]);

    // If completely empty, auto-seed and reload
    if (total === 0) {
      const totalInDb = await SankalpPhoto.countDocuments();
      if (totalInDb === 0) {
        await seedGalleryData();
        districtsWithCount = await SankalpPhoto.aggregate([
          { $match: { isPublished: true } },
          { $group: { _id: "$district", count: { $sum: 1 } } },
          { $sort: { count: -1, _id: 1 } },
          { $limit: 200 },
        ]);
        total = await SankalpPhoto.countDocuments(query);
      }
    }

    const totalPhotos = await SankalpPhoto.countDocuments({ isPublished: true });
    const pagination = getPagination(req.query.page, total, 24);
    let photos = await SankalpPhoto.find(query)
      .sort({ order: 1, date: -1, createdAt: -1 })
      .skip(pagination.skip)
      .limit(pagination.pageSize);
    if (total === 0) {
      photos = defaultGalleryPhotos.slice(pagination.skip, pagination.skip + pagination.pageSize);
    }

    res.render("gallery", {
      title: "फ़ोटो गैलरी",
      photos,
      selectedDistrict: typeof district === "string" ? district : "all",
      search,
      pagination,
      districtsWithCount: districtsWithCount || [],
      totalPhotos: totalPhotos || defaultGalleryPhotos.length,
      quickInfo: quickInfo || {},
    });
  } catch (error) {
    console.error("Gallery render error:", error);
    res.render("gallery", {
      title: "फ़ोटो गैलरी",
      photos: defaultGalleryPhotos,
      selectedDistrict: "all",
      districtsWithCount: [],
      totalPhotos: defaultGalleryPhotos.length,
      quickInfo: {},
      search: "",
      pagination: { page: 1, pageSize: 24, total: defaultGalleryPhotos.length, totalPages: 1 },
    });
  }
};

// API: Filtered photos JSON
exports.getGalleryApi = async (req, res) => {
  try {
    const { district, search } = req.query;
    const query = { isPublished: true };

    if (typeof district === "string" && district.trim() && district !== "all") {
      query.district = district.trim();
    }

    if (typeof search === "string" && search.trim()) {
      const regex = new RegExp(escapeRegex(search.trim().slice(0, 100)), "i");
      query.$or = [{ name: regex }, { district: regex }, { caption: regex }];
    }

    const [total] = await Promise.all([SankalpPhoto.countDocuments(query)]);
    const pagination = getPagination(req.query.page, total, 50);
    const photos = await SankalpPhoto.find(query).sort({
      order: 1,
      date: -1,
      createdAt: -1,
    }).skip(pagination.skip).limit(pagination.pageSize).lean();

    res.json({
      success: true,
      count: pagination.total,
      page: pagination.page,
      pageSize: pagination.pageSize,
      photos,
    });
  } catch (error) {
    console.error("Gallery API error:", error);
    res.status(500).json({ success: false, message: "Error fetching photos" });
  }
};
