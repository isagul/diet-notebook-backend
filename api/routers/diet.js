const express = require('express');
const router = express.Router();

const DietController = require('../controllers/diet');

router.post('/createDietList', DietController.createDietList);
router.put('/updateMealtoDiet', DietController.updateMealtoDiet);
router.get('/getUserDietList', DietController.getUserDietList);

module.exports = router;