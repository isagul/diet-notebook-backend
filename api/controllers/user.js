const User = require("../models/User");

exports.deleteUser = (req, res, next) => {
    User.findOne({ _id: req.body.user_id })
      .exec()
      .then((user) => {
        if (!user) {
          res.status(200).json({
            status: false,
            error: {
              message: "User not found!",
            },
          });
        } else {
          User.deleteOne({ _id: req.body.user_id })
            .exec()
            .then((result) => {
              res.status(200).json({
                status: true,
                message: "User deleted successfully",
              });
            })
            .catch((err) => {
              res.status(200).json({
                status: false,
                error: err,
              });
            });
        }
      });
  };
  
  exports.getUserInfo = (req, res, next) => [
    User.findOne({ email: req.body.email })
      .exec()
      .then((user) => {
        if (!user) {
          return res.status(200).json({
            status: false,
            error: {
              message: "User not found!",
            },
          });
        }
        res.status(200).json({
          status: true,
          user,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          error: err,
        });
      }),
  ];
  