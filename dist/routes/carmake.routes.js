"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carmake_controller_1 = require("../controllers/carmake.controller");
const router = (0, express_1.Router)();
router.route('/')
    .get(carmake_controller_1.getCarMakes)
    .post(carmake_controller_1.createCarMake);
router.route('/:id')
    .get(carmake_controller_1.getCarMake)
    .put(carmake_controller_1.updateCarMake)
    .delete(carmake_controller_1.deleteCarMake);
exports.default = router;
