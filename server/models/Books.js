const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String },
  field: { type: String },
  authorId: { type: mongoose.Types.ObjectId },
});

module.exports = mongoose.model("book", bookSchema);
