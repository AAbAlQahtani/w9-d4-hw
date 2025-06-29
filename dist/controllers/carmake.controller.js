"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarMake = exports.updateCarMake = exports.getCarMake = exports.getCarMakes = exports.createCarMake = void 0;
const carmake_model_1 = __importDefault(require("../models/carmake.model"));
const http_status_1 = require("../utils/http-status");
const createCarMake = async (req, res) => {
    try {
        const { country, brand } = req.body;
        if (!country || !brand) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'Country and brand are required',
            });
            return;
        }
        const carMake = await carmake_model_1.default.create({ country, brand });
        res.status(http_status_1.CREATED).json({
            success: true,
            data: carMake,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create car make',
        });
    }
};
exports.createCarMake = createCarMake;
const getCarMakes = async (_req, res) => {
    try {
        const carMakes = await carmake_model_1.default.find().sort({ createdAt: -1 });
        res.status(http_status_1.OK).json({
            success: true,
            data: carMakes,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch car makes',
        });
    }
};
exports.getCarMakes = getCarMakes;
const getCarMake = async (req, res) => {
    try {
        const carMake = await carmake_model_1.default.findById(req.params.id);
        if (!carMake) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car make not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: carMake,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch car make',
        });
    }
};
exports.getCarMake = getCarMake;
const updateCarMake = async (req, res) => {
    try {
        const carMake = await carmake_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!carMake) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car make not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: carMake,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update car make',
        });
    }
};
exports.updateCarMake = updateCarMake;
const deleteCarMake = async (req, res) => {
    try {
        const carMake = await carmake_model_1.default.findByIdAndDelete(req.params.id);
        if (!carMake) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Car make not found',
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
            error: error instanceof Error ? error.message : 'Failed to delete car make',
        });
    }
};
exports.deleteCarMake = deleteCarMake;
