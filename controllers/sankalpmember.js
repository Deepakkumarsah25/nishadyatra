const SankalpMember = require("../models/SankalpMember");

exports.form = (req, res) => {
  res.render("sankalp_form", {
    title: "Join Sankalp Yatra",
    error: null,
    success: req.query.success === "1",
  });
};

exports.register = async (req, res, next) => {
  try {
    const { name, age, mobile, email, village, state, district, block, consent } = req.body;
    if (!String(name || "").trim() || !String(age || "").trim() || !String(mobile || "").trim() ||
        !String(village || "").trim() || !String(state || "").trim() || !String(district || "").trim() ||
        !String(block || "").trim() || consent !== "yes") {
      return res.status(400).render("sankalp_form", {
        title: "Join Sankalp Yatra",
        error: "Please fill in all required fields and provide consent.",
        success: false,
      });
    }

    const address = [village, block, district, state]
      .map((part) => String(part).trim())
      .filter(Boolean)
      .join(", ");

    await SankalpMember.create({
      name: String(name).trim(),
      age: Number(age),
      mobile: String(mobile).trim(),
      email: String(email || "").trim(),
      address,
      consent: true,
    });

    return res.redirect("/sankalp-yatra?success=1");
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).render("sankalp_form", {
        title: "Join Sankalp Yatra",
        error: "Please enter valid information. Mobile number must be 10 digits.",
        success: false,
      });
    }
    return next(error);
  }
};
