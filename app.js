const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

mongoose.set('strictQuery', false);

const dietRoutes = require('./api/routers/diet');

const url = process.env.MONGODB_URI;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/diet', dietRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
