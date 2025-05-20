const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  name: String,
  surname: String,
  phone: String,
  date: Date,
  photoUrl: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Borrow", borrowSchema);
