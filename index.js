// index.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// tes routes
const authRoutes = require("./routes/auth");
const borrowRoutes = require("./routes/borrow");

const app = express();
app.use(cors());
app.use(express.json());

// connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.error("❌ Erreur MongoDB :", err));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/borrow", borrowRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend TupperApp OK ✅");
});

// lancement serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
