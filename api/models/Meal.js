const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const mealSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  items: { type: Schema.Types.Array, required: true },
});

module.exports = model("Meal", mealSchema);
