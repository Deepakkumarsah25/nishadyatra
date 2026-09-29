const bcrypt = require("bcryptjs");

const Admin = require("../../models/admin/Admin");

// ========================================
// SHOW LOGIN
// ========================================

exports.showLogin = (req, res) => {
  res.set("Cache-Control", "no-store");

  return res.render("admin/auth/login", {
    title: "Admin Login",
    error: null,
    success: null,
  });
};

// ========================================
// LOGIN
// ========================================

exports.login = async (req, res) => {
  try {
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();

    const password = String(req.body.password || "");

    // ========================================
    // Validation
    // ========================================

    if (!email || !password) {
      return res.status(400).render("admin/auth/login", {
        title: "Admin Login",
        error: "Both email and password are required.",
        success: null,
      });
    }

    // ========================================
    // Find Admin
    // ========================================

    const admin = await Admin.findOne({
      email,
    });

    if (!admin) {
      return res.status(401).render("admin/auth/login", {
        title: "Admin Login",
        error: "Invalid email or password.",
        success: null,
      });
    }

    // ========================================
    // Check Active Status
    // ========================================

    if (!admin.isActive) {
      return res.status(403).render("admin/auth/login", {
        title: "Admin Login",
        error: "Admin account is inactive.",
        success: null,
      });
    }

    // ========================================
    // Check Password
    // ========================================

    const passwordMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatch) {
      return res.status(401).render("admin/auth/login", {
        title: "Admin Login",
        error: "Invalid email or password.",
        success: null,
      });
    }

    // ========================================
    // Regenerate Session
    // ========================================

    req.session.regenerate((sessionError) => {
      if (sessionError) {
        console.error("Session Regenerate Error:", sessionError);

        return res.status(500).render("admin/auth/login", {
          title: "Admin Login",
          error: "Could not create login session.",
          success: null,
        });
      }

      // ========================================
      // Store ONLY safe admin information
      // ========================================

      req.session.admin = {
        id: admin._id.toString(),
        name: admin.name,
        email: admin.email,
        role: admin.role,
      };

      // ========================================
      // Save Session
      // ========================================

      req.session.save((saveError) => {
        if (saveError) {
          console.error("Session Save Error:", saveError);

          return res.status(500).render(
            "admin/auth/login",
            {
              title: "Admin Login",
              error: "Could not save login session.",
              success: null,
            }
          );
        }

        return res.redirect("/admin/dashboard");
      });
    });
  } catch (error) {
    console.error("Admin Login Error:", error);

    return res.status(500).render("admin/auth/login", {
      title: "Admin Login",
      error: "Server error. Please try again.",
      success: null,
    });
  }
};

// ========================================
// LOGOUT
// ========================================

exports.logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Logout Error:", error);

      return res.redirect("/admin/dashboard");
    }

    // Clear session cookie
    res.clearCookie("nishad_admin_session", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return res.redirect("/admin/login");
  });
};