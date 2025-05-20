const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const Borrow = require("../models/Borrow");

// 📦 stockage temporaire en mémoire
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const { name, surname, phone, date } = req.body;

    // 📤 upload vers Cloudinary
    const uploaded = await cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      async (error, result) => {
        if (error) return res.status(500).json({ error: error.message });

        const newBorrow = new Borrow({
          name,
          surname,
          phone,
          date,
          photoUrl: result.secure_url,
        });

        await newBorrow.save();
        res.status(200).json({ success: true, borrow: newBorrow });
      }
    );

    // Envoie le buffer de l’image
    uploaded.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
