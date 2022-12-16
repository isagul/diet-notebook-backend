const mongoose = require("mongoose");

const Diet = require('./Diet').schema;

const { Schema, model } = mongoose;

const userSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true, minlength: 5 },
  dietList: [Diet],
});

module.exports = model("User", userSchema);