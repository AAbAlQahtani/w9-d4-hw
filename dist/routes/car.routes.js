"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const car_controller_1 = require("../controllers/car.controller");
const router = (0, express_1.Router)();
router.get('/', car_controller_1.getCars);
router.get('/dealer/:dealerId', car_controller_1.getCarsByDealerId);
router.get('/make/:carMakeId', car_controller_1.getCarsByMakeId);
router.post('/', car_controller_1.createCar);
router.route('/:id')
    .get(car_controller_1.getCar)
    .put(car_controller_1.updateCar)
    .delete(car_controller_1.deleteCar);
exports.default = router;
