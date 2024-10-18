var express = require('express');
var router = express.Router();

const carsRouter = require("../controllers/cars")
 
router.get('/', carsRouter.getAllCars);
 
router.get('/:id', carsRouter.getCarById);
 
router.post('/', carsRouter.updateCar);
 
router.put('/:id', carsRouter.updateCar);
 
router.delete('/:id', carsRouter.deleteCar);
 
module.exports = router;