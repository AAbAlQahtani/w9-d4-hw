"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarsByMakeId = exports.getCarsByDealerId = exports.deleteCar = exports.updateCar = exports.getCar = exports.getCars = exports.createCar = void 0;
const car_model_1 = __importDefault(require("../models/car.model"));
const dealer_model_1 = __importDefault(require("../models/dealer.model"));
const carmake_model_1 = __importDefault(require("../models/carmake.model"));
const http_status_1 = require("../utils/http-status");
const createCar = async (req, res) => {
    try {
        const { dealerId, carMakeId, name, price, year, color, wheelsCount } = req.body;
        if (!dealerId || !carMakeId || !name || !price || !year || !color || wheelsCount == null) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'All fields are required',
            });
            return;
        }
        const dealer = await dealer_model_1.default.findById(dealerId);
        if (!dealer) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Dealer not found',
            });
            return;
        }
        const carMake = await carmake_model_1.default.findById(carMakeId);
        if (!carMake) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car make not found',
            });
            return;
        }
        const car = await car_model_1.default.create({
            dealerId,
            carMakeId,
            name,
            price,
            year,
            color,
            wheelsCount,
        });
        res.status(http_status_1.CREATED).json({
            success: true,
            data: car,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create car',
        });
    }
};
exports.createCar = createCar;
const getCars = async (_req, res) => {
    try {
        const cars = await car_model_1.default.find().sort({ createdAt: -1 });
        res.status(http_status_1.OK).json({
            success: true,
            data: cars,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch cars',
        });
    }
};
exports.getCars = getCars;
const getCar = async (req, res) => {
    try {
        const car = await car_model_1.default.findById(req.params.id);
        if (!car) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: car,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch car',
        });
    }
};
exports.getCar = getCar;
const updateCar = async (req, res) => {
    try {
        const car = await car_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!car) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: car,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update car',
        });
    }
};
exports.updateCar = updateCar;
const deleteCar = async (req, res) => {
    try {
        const car = await car_model_1.default.findByIdAndDelete(req.params.id);
        if (!car) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: {},
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete car',
        });
    }
};
exports.deleteCar = deleteCar;
const getCarsByDealerId = async (req, res) => {
    try {
        const { dealerId } = req.params;
        if (!dealerId) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'Dealer ID is required',
            });
            return;
        }
        const dealer = await dealer_model_1.default.findById(dealerId);
        if (!dealer) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Dealer not found',
            });
            return;
        }
        const cars = await car_model_1.default.find({ dealerId });
        if (!cars.length) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'No cars found for this dealer',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: cars,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get cars by dealer ID',
        });
    }
};
exports.getCarsByDealerId = getCarsByDealerId;
const getCarsByMakeId = async (req, res) => {
    try {
        const { carMakeId } = req.params;
        if (!carMakeId) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'Car make ID is required',
            });
            return;
        }
        const carMake = await carmake_model_1.default.findById(carMakeId);
        if (!carMake) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car make not found',
            });
            return;
        }
        const cars = await car_model_1.default.find({ carMakeId });
        if (!cars.length) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'No cars found for this make',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: cars,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get cars by make ID',
        });
    }
};
exports.getCarsByMakeId = getCarsByMakeId;
