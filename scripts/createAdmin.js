require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("../models/admin/Admin");

const createAdmin = async () => {
  try {

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");


    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;


    if (!name || !email || !password) {

      console.log(
        "❌ Please add ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD to .env"
      );

      process.exit(1);
    }


    const existingAdmin = await Admin.findOne({
      email: email.toLowerCase(),
    });


    if (existingAdmin) {

      console.log(
        "⚠️ Admin already exists:",
        existingAdmin.email
      );

      process.exit(0);
    }


    const hashedPassword = await bcrypt.hash(
      password,
      12
    );


    const admin = await Admin.create({

      name,

      email: email.toLowerCase(),

      password: hashedPassword,

      role: "superadmin",

      isActive: true,

    });


    console.log("================================");
    console.log("✅ Admin Created Successfully");
    console.log("================================");
    console.log("Name:", admin.name);
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);
    console.log("================================");


    process.exit(0);

  } catch (error) {

    console.error(
      "❌ Create Admin Error:",
      error.message
    );

    process.exit(1);
  }
};


createAdmin();