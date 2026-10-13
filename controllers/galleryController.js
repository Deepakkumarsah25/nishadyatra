const SankalpPhoto = require("../models/SankalpPhoto");
const HomeQuickInfo = require("../models/HomeQuickInfo");

const { getPagination } = require("../utils/pagination");
const { buildStateMongoQuery, buildDistrictMongoQuery } = require("../utils/indiaStatesDistricts");

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function addGallerySearch(query, search) {
  if (typeof search !== "string" || !search.trim()) return;

  const fields = ["name", "district", "caption", "dateString"];
  const terms = search.trim().slice(0, 100).split(/\s+/).filter(Boolean);
  query.$and = terms.map((term) => {
    const regex = new RegExp(escapeRegex(term), "i");
    return { $or: fields.map((field) => ({ [field]: regex })) };
  });
}

// Public Gallery Page
exports.getGalleryPage = async (req, res) => {
  try {
    const state = typeof req.query.state === "string" ? req.query.state.trim().slice(0, 80) : "";
    const district = typeof req.query.district === "string" ? req.query.district.trim().slice(0, 100) : "";
    const search = typeof req.query.search === "string" ? req.query.search.trim().slice(0, 100) : "";

    const query = { isPublished: true };
    const stateQuery = buildStateMongoQuery(state);
    if (stateQuery) query.state = stateQuery;
    const districtQuery = buildDistrictMongoQuery(district);
    if (districtQuery) query.district = districtQuery;
    addGallerySearch(query, search);

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

    const hasActiveFilters = Boolean(
      search || (state && state !== "all") || (district && district !== "all")
    );

    const totalPhotos = await SankalpPhoto.countDocuments({ isPublished: true });
    const pagination = getPagination(req.query.page, total, 24);
    const photos = await SankalpPhoto.find(query)
      .sort({ order: 1, date: -1, createdAt: -1 })
      .skip(pagination.skip)
      .limit(pagination.pageSize);

    res.render("gallery", {
      title: "फ़ोटो गैलरी",
      photos,
      selectedState: state || "all",
      selectedDistrict: district || "all",
      search,
      pagination,
      districtsWithCount: districtsWithCount || [],
      totalPhotos,
      quickInfo: quickInfo || {},
    });
  } catch (error) {
    console.error("Gallery render error:", error);
    const search = typeof req.query.search === "string" ? req.query.search.trim().slice(0, 100) : "";
    const state = typeof req.query.state === "string" ? req.query.state : "all";
    const district = typeof req.query.district === "string" ? req.query.district : "all";
    const hasActiveFilters = Boolean(search || (state && state !== "all") || (district && district !== "all"));
    res.render("gallery", {
      title: "फ़ोटो गैलरी",
      photos: [],
      selectedState: state,
      selectedDistrict: district,
      districtsWithCount: [],
      totalPhotos: 0,
      quickInfo: {},
      search,
      pagination: { page: 1, pageSize: 24, total: 0, totalPages: 0 },
    });
  }
};

// API: Filtered photos JSON
exports.getGalleryApi = async (req, res) => {
  try {
    const state = typeof req.query.state === "string" ? req.query.state.trim().slice(0, 80) : "";
    const district = typeof req.query.district === "string" ? req.query.district.trim().slice(0, 100) : "";
    const search = typeof req.query.search === "string" ? req.query.search.trim().slice(0, 100) : "";
    const query = { isPublished: true };

    const stateQuery = buildStateMongoQuery(state);
    if (stateQuery) query.state = stateQuery;
    const districtQuery = buildDistrictMongoQuery(district);
    if (districtQuery) query.district = districtQuery;

    addGallerySearch(query, search);

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
