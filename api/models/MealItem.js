const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const mealItemSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
});

module.exports = model("MealItem", mealItemSchema);
