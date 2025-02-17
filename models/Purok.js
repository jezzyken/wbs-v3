const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purokSchema = new Schema({
  purok: {
    type: String,
    required: true,
    unique: true,
  },
});

const Purok = mongoose.model("Purok", purokSchema);
module.exports = Purok;
