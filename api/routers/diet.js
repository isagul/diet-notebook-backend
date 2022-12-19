const express = require('express');
const router = express.Router();

const DietController = require('../controllers/diet');

router.post('/createDietList', DietController.createDietList);
router.put('/updateMealtoDiet', DietController.updateMealtoDiet);
router.get('/getUserDietList', DietController.getUserDietList);
router.delete('/deleteMealItem', DietController.deleteMealItem);
router.put('/updateMealItem', DietController.updateMealItem);
router.post('/createDailyResults', DietController.createDailyResults);

module.exports = router;