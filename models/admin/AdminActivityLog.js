const mongoose = require("mongoose");

const adminActivityLogSchema = new mongoose.Schema(
  {
    adminEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    adminName: {
      type: String,
      default: "Super Admin",
      trim: true,
    },
    module: {
      type: String,
      default: "kalash-yatra",
      trim: true,
    },
    section: {
      type: String,
      required: true,
      trim: true,
    },
    action: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
      default: "",
      trim: true,
    },
    ipAddress: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Static helper to record an activity
adminActivityLogSchema.statics.record = async function ({
  req,
  section,
  action,
  details,
  module = "kalash-yatra",
}) {
  try {
    const admin = req && req.session && req.session.admin ? req.session.admin : null;
    const adminEmail = (admin && admin.email) || process.env.ADMIN_EMAIL || "admin@gmail.com";
    const adminName = (admin && admin.name) || "Super Admin";
    const ipAddress = (req && (req.headers["x-forwarded-for"] || req.ip || req.connection?.remoteAddress)) || "";

    return await this.create({
      adminEmail,
      adminName,
      module,
      section,
      action,
      details: details || "",
      ipAddress: String(ipAddress).substring(0, 45),
    });
  } catch (err) {
    console.error("Failed to record admin activity log:", err);
  }
};

module.exports = mongoose.model("AdminActivityLog", adminActivityLogSchema);
