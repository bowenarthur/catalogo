const mongoose = require("mongoose");
const MovieSchema = mongoose.Schema({
  name: String,
  year: Number,
  duration: Number,
  coverUrl: String,
  category: [String],
  characters: [
    {
      name: String,
      performer: String,
    },
  ],
});
module.exports = mongoose.model("Movie", MovieSchema);
