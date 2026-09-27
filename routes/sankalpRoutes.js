const express = require("express");
const router = express.Router();

const SankalpMember = require("../models/SankalpMember");

// ================================
// Registration Page
// ================================
router.get("/", (req, res) => {
  res.render("sankalp_form", {
    title: "संकल्प यात्रा से जुड़ें",
  });
});

// ================================
// Register Member
// ================================
router.post("/register", async (req, res) => {
  try {

    const {
      name,
      age,
      mobile,
      email,
      address,
      consent,
    } = req.body;

    // Required fields
    if (!name || !age || !mobile || !address || !consent) {
      return res.status(400).send(
        "कृपया सभी आवश्यक जानकारी भरें।"
      );
    }

    // Mobile validation
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).send(
        "कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।"
      );
    }

    // Age validation
    if (Number(age) < 1 || Number(age) > 120) {
      return res.status(400).send(
        "कृपया सही उम्र दर्ज करें।"
      );
    }

    // Save to MongoDB
    const member = new SankalpMember({
      name,
      age: Number(age),
      mobile,
      email,
      address,
      consent: consent === "yes",
    });

    await member.save();

    // Success page
    res.send(`
      <!DOCTYPE html>
      <html lang="hi">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>पंजीकरण सफल</title>

        <style>
          body {
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #FBF4EC;
            font-family: Arial, sans-serif;
            color: #2A1414;
          }

          .success-card {
            width: min(90%, 500px);
            background: white;
            padding: 45px 30px;
            text-align: center;
            border-radius: 20px;
            border: 1px solid #E9D9C8;
            box-shadow: 0 20px 50px rgba(140,26,26,.12);
          }

          .icon {
            width: 70px;
            height: 70px;
            margin: 0 auto 20px;
            border-radius: 50%;
            background: #D72A2A;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
          }

          h1 {
            color: #8C1A1A;
          }

          p {
            color: #6B4F4F;
            line-height: 1.7;
          }

          a {
            display: inline-block;
            margin-top: 20px;
            padding: 13px 25px;
            background: #D72A2A;
            color: white;
            text-decoration: none;
            border-radius: 10px;
            font-weight: bold;
          }
        </style>
      </head>

      <body>

        <div class="success-card">

          <div class="icon">
            ✓
          </div>

          <h1>
            पंजीकरण सफल!
          </h1>

          <p>
            धन्यवाद! आप सफलतापूर्वक
            निषाद संकल्प यात्रा से जुड़ गए हैं।
          </p>

          <a href="/">
            मुख्य पृष्ठ पर जाएँ
          </a>

        </div>

      </body>
      </html>
    `);

  } catch (error) {

    console.error(
      "Sankalp Registration Error:",
      error
    );

    res.status(500).send(
      "पंजीकरण करते समय समस्या हुई। कृपया दोबारा प्रयास करें।"
    );
  }
});

module.exports = router;