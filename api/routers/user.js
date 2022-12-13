const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

router.post('/getUserInfo', UserController.getUserInfo);
router.post('/deleteUser', UserController.deleteUser);

module.exports = router;