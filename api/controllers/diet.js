const mongoose = require('mongoose');

const User = require('../models/User');

function getAllDaysInMonth(year, month) {
  const date = new Date(year, month, 1);

  const dates = [];

  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

const formatDate = day => {
  const d = new Date(day);
  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
};


exports.createDietList = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(async (user) => {
      const now = new Date();
      const days = getAllDaysInMonth(now.getFullYear(), now.getMonth());

      const dietObject = days.map(dayName => {
        return ({
          _id: mongoose.Types.ObjectId(),
          date: formatDate(dayName),
          meals: [
            {
              _id: mongoose.Types.ObjectId(),
              property: 'breakfast',
              name: 'Kahvaltı',
              items: [],
            },
            {
              _id: mongoose.Types.ObjectId(),
              property: 'firstSnack',
              name: 'Ara Öğün',
              items: [],
            },
            {
              _id: mongoose.Types.ObjectId(),
              property: 'afternoon',
              name: 'Öğle Yemeği',
              items: [],
            },
            {
              _id: mongoose.Types.ObjectId(),
              property: 'secondSnack',
              name: 'Ara Öğün 1',
              items: [],
            },
            {
              _id: mongoose.Types.ObjectId(),
              property: 'thirdSnack',
              name: 'Ara Öğün 2',
              items: [],
            },
            {
              _id: mongoose.Types.ObjectId(),
              property: 'dinner',
              name: 'Akşam Yemeği',
              items: [],
            },
          ]
        })
      })

      console.log('dietObject :>> ', dietObject);

      const userUpdate = User.findOneAndUpdate(
        { email: req.body.email },
        {
          "$set": {
            "dietList": dietObject,
          },
        }
      )

      userUpdate
        .then(result => {
          res.status(200).json({
            status: true,
            message: result
          })
        })
        .catch(err => {
          res.status(500).json({
            status: false,
            error: err
          })
        })

    })
}

exports.updateMealtoDiet = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(async (user) => {
      try {
        const result = await User.findOneAndUpdate(
          { email: req.body.email },
          {
            // "$set": {
            //   "dietList.$[list].date": req.body.date,
            //   "dietList.$[list].meals.$[meal].name": req.body.mealName,
            // },
            "$push": {
              "dietList.$[list].meals.$[meal].items": {
                _id: mongoose.Types.ObjectId(),
                name: req.body.item
              },
            }
          },
          {
            "arrayFilters": [
              { "list.date": req.body.date },
              { "meal.property": req.body.mealName }
            ], new: true
          },
        )

        res.status(200).json({ message: "Item was updated successfully!" });
      } catch (error) {
        res.status(500).json({ error: 'There was a Server Side Error!' })
      }

    })
}

exports.getUserDietList = (req, res, next) => {
  User.findOne({ email: req.query.email })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(500).json({
          status: false,
          message: 'User not found!'
        })
      }
      return res.status(200).json({
        status: true,
        dietList: user.dietList,
      })
    })
    .catch(err => {
      res.status(500).json({
        status: false,
        error: err
      })
    })
}
