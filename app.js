const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require('express-session');

const app = express();

const userRoutes = require('./api/routers/user');
const authRoutes = require('./api/routers/auth');

const url = `mongodb+srv://isagul:${process.env.MONGO_PASS}@cluster0.42icuev.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/auth', authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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
