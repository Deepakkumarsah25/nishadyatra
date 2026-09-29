const SankalpPhoto = require("../../models/SankalpPhoto");
const fs = require("fs");
const path = require("path");

// Format date helper for input type="date"
const formatDateForInput = (date) => {
  if (!date) return "";
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
  } catch (e) {
    return "";
  }
};

// 1. List all gallery photos with search, district & status filters
exports.getGalleryList = async (req, res) => {
  try {
    const { district, status, search, msg, err } = req.query;

    const query = {};

    if (district && district.trim() && district !== "all") {
      query.district = district.trim();
    }

    if (status === "published") {
      query.isPublished = true;
    } else if (status === "unpublished") {
      query.isPublished = false;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      query.$or = [{ name: regex }, { district: regex }, { caption: regex }];
    }

    const [photos, totalCount, publishedCount, unpublishedCount, districtsList] =
      await Promise.all([
        SankalpPhoto.find(query).sort({ order: 1, date: -1, createdAt: -1 }),
        SankalpPhoto.countDocuments(),
        SankalpPhoto.countDocuments({ isPublished: true }),
        SankalpPhoto.countDocuments({ isPublished: false }),
        SankalpPhoto.distinct("district"),
      ]);

    res.render("admin/gallery/index", {
      title: "Sankalp Photo Gallery Management",
      admin: req.session.admin,
      photos,
      stats: {
        total: totalCount,
        published: publishedCount,
        unpublished: unpublishedCount,
        districtsCount: districtsList.length,
      },
      districtsList,
      filters: {
        district: district || "all",
        status: status || "all",
        search: search || "",
      },
      currentPath: "/admin/gallery",
      message: msg || null,
      error: err || null,
    });
  } catch (error) {
    console.error("Gallery list fetch error:", error);
    res.status(500).redirect("/admin/dashboard?err=Failed to load gallery");
  }
};

// 2. Render Single Add Form
exports.getCreatePhoto = async (req, res) => {
  try {
    const districtsList = await SankalpPhoto.distinct("district");
    res.render("admin/gallery/form", {
      title: "Add New Sankalp Photo",
      admin: req.session.admin,
      photo: {
        name: "",
        district: "",
        date: new Date(),
        caption: "",
        imageUrl: "",
        isPublished: true,
        order: 0,
      },
      formatDateForInput,
      districtsList,
      currentPath: "/admin/gallery",
      isEdit: false,
      error: null,
    });
  } catch (error) {
    console.error("Get create photo form error:", error);
    res.redirect("/admin/gallery?err=Error loading form");
  }
};

// 3. Process Single Add Form
exports.postCreatePhoto = async (req, res) => {
  try {
    const { name, district, date, caption, imageUrl, isPublished, order } =
      req.body;

    let finalImageUrl = "";
    let imageFilename = "";

    if (req.file) {
      finalImageUrl = `/uploads/gallery/${req.file.filename}`;
      imageFilename = req.file.filename;
    } else if (imageUrl && imageUrl.trim()) {
      finalImageUrl = imageUrl.trim();
    } else {
      const districtsList = await SankalpPhoto.distinct("district");
      return res.render("admin/gallery/form", {
        title: "Add New Sankalp Photo",
        admin: req.session.admin,
        photo: req.body,
        formatDateForInput,
        districtsList,
        currentPath: "/admin/gallery",
        isEdit: false,
        error: "Please choose a photo file or enter an image URL.",
      });
    }

    if (!district || !district.trim()) {
      const districtsList = await SankalpPhoto.distinct("district");
      return res.render("admin/gallery/form", {
        title: "Add New Sankalp Photo",
        admin: req.session.admin,
        photo: req.body,
        formatDateForInput,
        districtsList,
        currentPath: "/admin/gallery",
        isEdit: false,
        error: "Please select or enter a district.",
      });
    }

    const photoDate = date ? new Date(date) : new Date();

    await SankalpPhoto.create({
      name: name && name.trim() ? name.trim() : "Sanatani Nishad",
      district: district.trim(),
      date: isNaN(photoDate.getTime()) ? new Date() : photoDate,
      caption: caption ? caption.trim() : "",
      imageUrl: finalImageUrl,
      imageFilename,
      isPublished:
        isPublished === "on" || isPublished === "true" || isPublished === true,
      order: Number(order) || 0,
    });

    res.redirect("/admin/gallery?msg=Sankalp photo successfully added.");
  } catch (error) {
    console.error("Create photo error:", error);
    const districtsList = await SankalpPhoto.distinct("district").catch(
      () => []
    );
    res.render("admin/gallery/form", {
      title: "Add New Sankalp Photo",
      admin: req.session.admin,
      photo: req.body,
      formatDateForInput,
      districtsList,
      currentPath: "/admin/gallery",
      isEdit: false,
      error: "Error saving photo: " + error.message,
    });
  }
};

// 4. Render Bulk Upload Form
exports.getBulkUpload = async (req, res) => {
  try {
    const districtsList = await SankalpPhoto.distinct("district");
    res.render("admin/gallery/bulk", {
      title: "Bulk Image Upload",
      admin: req.session.admin,
      districtsList,
      formatDateForInput,
      currentPath: "/admin/gallery",
      error: null,
      todayStr: formatDateForInput(new Date()),
    });
  } catch (error) {
    console.error("Get bulk form error:", error);
    res.redirect("/admin/gallery?err=Error loading bulk upload");
  }
};

// 5. Process Bulk Upload
exports.postBulkUpload = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      const districtsList = await SankalpPhoto.distinct("district");
      return res.render("admin/gallery/bulk", {
        title: "Bulk Image Upload",
        admin: req.session.admin,
        districtsList,
        formatDateForInput,
        currentPath: "/admin/gallery",
        error: "Please select at least one or more images!",
        todayStr: formatDateForInput(new Date()),
      });
    }

    const { defaultDistrict, defaultDate, defaultName, defaultCaption, isPublished } =
      req.body;

    if (!defaultDistrict || !defaultDistrict.trim()) {
      const districtsList = await SankalpPhoto.distinct("district");
      return res.render("admin/gallery/bulk", {
        title: "Bulk Image Upload",
        admin: req.session.admin,
        districtsList,
        formatDateForInput,
        currentPath: "/admin/gallery",
        error: "Please specify a district for all photos.",
        todayStr: formatDateForInput(new Date()),
      });
    }

    const photoDate = defaultDate ? new Date(defaultDate) : new Date();
    const publishedBool =
      isPublished === "on" || isPublished === "true" || isPublished === true;

    const docsToInsert = files.map((file, idx) => {
      // Derive name if custom or fallback
      let photoName = defaultName && defaultName.trim() ? defaultName.trim() : "Sanatani Nishad";
      if (files.length > 1 && defaultName && defaultName.trim()) {
        photoName = `${defaultName.trim()} #${idx + 1}`;
      }

      return {
        name: photoName,
        district: defaultDistrict.trim(),
        date: isNaN(photoDate.getTime()) ? new Date() : photoDate,
        caption: defaultCaption ? defaultCaption.trim() : "Mass Pledge Campaign",
        imageUrl: `/uploads/gallery/${file.filename}`,
        imageFilename: file.filename,
        isPublished: publishedBool,
        order: idx,
      };
    });

    await SankalpPhoto.insertMany(docsToInsert);

    res.redirect(
      `/admin/gallery?msg=${files.length} photos successfully uploaded together!`
    );
  } catch (error) {
    console.error("Bulk upload error:", error);
    const districtsList = await SankalpPhoto.distinct("district").catch(
      () => []
    );
    res.render("admin/gallery/bulk", {
      title: "Bulk Image Upload",
      admin: req.session.admin,
      districtsList,
      formatDateForInput,
      currentPath: "/admin/gallery",
      error: "Error during bulk upload: " + error.message,
      todayStr: formatDateForInput(new Date()),
    });
  }
};

// 6. Render Edit Form
exports.getEditPhoto = async (req, res) => {
  try {
    const photo = await SankalpPhoto.findById(req.params.id);
    if (!photo) {
      return res.redirect("/admin/gallery?err=Photo not found");
    }

    const districtsList = await SankalpPhoto.distinct("district");

    res.render("admin/gallery/form", {
      title: "Edit Sankalp Photo",
      admin: req.session.admin,
      photo,
      formatDateForInput,
      districtsList,
      currentPath: "/admin/gallery",
      isEdit: true,
      error: null,
    });
  } catch (error) {
    console.error("Get edit photo error:", error);
    res.redirect("/admin/gallery?err=Error loading photo");
  }
};

// 7. Process Edit Form
exports.postEditPhoto = async (req, res) => {
  try {
    const { name, district, date, caption, imageUrl, isPublished, order } =
      req.body;

    const existing = await SankalpPhoto.findById(req.params.id);
    if (!existing) {
      return res.redirect("/admin/gallery?err=Photo not found");
    }

    let finalImageUrl = existing.imageUrl;
    let imageFilename = existing.imageFilename;

    if (req.file) {
      // Clean up previous uploaded image if exists
      if (existing.imageFilename) {
        const oldPath = path.join(
          __dirname,
          "..",
          "..",
          "uploads",
          "gallery",
          existing.imageFilename
        );
        if (fs.existsSync(oldPath)) {
          try {
            fs.unlinkSync(oldPath);
          } catch (e) {}
        }
      }
      finalImageUrl = `/uploads/gallery/${req.file.filename}`;
      imageFilename = req.file.filename;
    } else if (imageUrl && imageUrl.trim()) {
      finalImageUrl = imageUrl.trim();
    }

    const photoDate = date ? new Date(date) : existing.date;

    existing.name = name && name.trim() ? name.trim() : existing.name;
    existing.district = district && district.trim() ? district.trim() : existing.district;
    existing.date = isNaN(photoDate.getTime()) ? existing.date : photoDate;
    existing.caption = typeof caption !== "undefined" ? caption.trim() : existing.caption;
    existing.imageUrl = finalImageUrl;
    existing.imageFilename = imageFilename;
    existing.isPublished =
      isPublished === "on" || isPublished === "true" || isPublished === true;
    existing.order = Number(order) || 0;

    await existing.save();

    res.redirect("/admin/gallery?msg=Photo details successfully updated.");
  } catch (error) {
    console.error("Edit photo error:", error);
    const districtsList = await SankalpPhoto.distinct("district").catch(
      () => []
    );
    res.render("admin/gallery/form", {
      title: "Edit Sankalp Photo",
      admin: req.session.admin,
      photo: { ...req.body, _id: req.params.id },
      formatDateForInput,
      districtsList,
      currentPath: "/admin/gallery",
      isEdit: true,
      error: "Error updating photo: " + error.message,
    });
  }
};

// 8. Toggle Publish / Unpublish Status
exports.togglePhotoPublish = async (req, res) => {
  try {
    const photo = await SankalpPhoto.findById(req.params.id);
    if (photo) {
      photo.isPublished = !photo.isPublished;
      await photo.save();
      const statusText = photo.isPublished ? "Published" : "Unpublished";
      return res.redirect(`/admin/gallery?msg=${encodeURIComponent(`Photo status changed to '${statusText}'.`)}`);
    }
    res.redirect("/admin/gallery?err=Photo not found");
  } catch (error) {
    console.error("Toggle photo error:", error);
    res.redirect("/admin/gallery?err=Failed to change status");
  }
};

// 9. Delete Photo
exports.deletePhoto = async (req, res) => {
  try {
    const photo = await SankalpPhoto.findByIdAndDelete(req.params.id);
    if (photo && photo.imageFilename) {
      const filePath = path.join(
        __dirname,
        "..",
        "..",
        "uploads",
        "gallery",
        photo.imageFilename
      );
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {}
      }
    }
    res.redirect("/admin/gallery?msg=Photo successfully deleted.");
  } catch (error) {
    console.error("Delete photo error:", error);
    res.redirect("/admin/gallery?err=Failed to delete photo");
  }
};
