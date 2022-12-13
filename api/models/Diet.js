const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const dietSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: { type: String, required: true },
  meals: { type: Schema.Types.Array, required: true },
});

module.exports = model("Diet", dietSchema);
