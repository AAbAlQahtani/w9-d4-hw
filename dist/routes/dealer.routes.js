"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dealer_controller_1 = require("../controllers/dealer.controller");
const router = (0, express_1.Router)();
router.route('/')
    .get(dealer_controller_1.getDealers)
    .post(dealer_controller_1.createDealer);
router.route('/:id')
    .get(dealer_controller_1.getDealer)
    .put(dealer_controller_1.updateDealer)
    .delete(dealer_controller_1.deleteDealer);
exports.default = router;
