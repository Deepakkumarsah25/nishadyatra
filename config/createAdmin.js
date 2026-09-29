const bcrypt = require("bcryptjs");
const Admin = require("../models/admin/Admin");

const createDefaultAdmin = async () => {
  try {
    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!name || !email || !password) {
      return;
    }

    const existingAdmin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingAdmin) {
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await Admin.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: "superadmin",
      isActive: true,
    });

    console.log(`Admin account initialized: ${admin.email}`);
  } catch (error) {
    console.error("Admin setup error:", error.message);
  }
};

module.exports = createDefaultAdmin;