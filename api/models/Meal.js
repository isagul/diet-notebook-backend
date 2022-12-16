const mongoose = require("mongoose");

// const MealItem = require('./MealItem').schema;

const { Schema, model } = mongoose;

const mealSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  property: { type: String, required: true },
  items: { type: Array, required: true },
});

module.exports = model("Meal", mealSchema);
