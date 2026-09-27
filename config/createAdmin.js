const bcrypt = require("bcryptjs");
const Admin = require("../models/admin/Admin");

const createDefaultAdmin = async () => {
  try {
    // ================================
    // Admin Details From .env
    // ================================

    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    // ================================
    // Check Environment Variables
    // ================================

    if (!name || !email || !password) {
      console.log(
        "⚠️ Admin credentials .env में नहीं मिले।"
      );

      return;
    }

    // ================================
    // Check Existing Admin
    // ================================

    const existingAdmin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingAdmin) {
      console.log(
        `✅ Admin already exists: ${existingAdmin.email}`
      );

      return;
    }

    // ================================
    // Hash Password
    // ================================

    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    // ================================
    // Create Admin
    // ================================

    const admin = await Admin.create({
      name: name.trim(),

      email: email.toLowerCase().trim(),

      password: hashedPassword,

      role: "superadmin",

      isActive: true,
    });

    console.log("================================");
    console.log("✅ Default Admin Created");
    console.log("================================");
    console.log(`Name  : ${admin.name}`);
    console.log(`Email : ${admin.email}`);
    console.log(`Role  : ${admin.role}`);
    console.log("================================");

  } catch (error) {
    console.error(
      "❌ Default Admin Creation Error:",
      error.message
    );
  }
};

module.exports = createDefaultAdmin;