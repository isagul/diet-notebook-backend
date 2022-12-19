const mongoose = require("mongoose");

const Meal = require('./Meal').schema;

const { Schema, model } = mongoose;

const dietSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: { type: String, required: true },
  meals: [Meal],
  stepCount: { type: String },
  waterAmount: { type: String },
});

module.exports = model("Diet", dietSchema);
