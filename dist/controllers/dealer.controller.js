"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDealer = exports.updateDealer = exports.getDealer = exports.getDealers = exports.createDealer = void 0;
const dealer_model_1 = __importDefault(require("../models/dealer.model"));
const http_status_1 = require("../utils/http-status");
const createDealer = async (req, res) => {
    try {
        const { name, email, city } = req.body;
        if (!name || !email || !city) {
            res.status(http_status_1.BAD_REQUEST).json({
                success: false,
                error: 'Name, email, and city are required',
            });
            return;
        }
        const dealer = await dealer_model_1.default.create({ name, email, city });
        res.status(http_status_1.CREATED).json({
            success: true,
            data: dealer,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create dealer',
        });
    }
};
exports.createDealer = createDealer;
const getDealers = async (_req, res) => {
    try {
        const dealers = await dealer_model_1.default.find().sort({ createdAt: -1 });
        res.status(http_status_1.OK).json({
            success: true,
            data: dealers,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch dealers',
        });
    }
};
exports.getDealers = getDealers;
const getDealer = async (req, res) => {
    try {
        const dealer = await dealer_model_1.default.findById(req.params.id);
        if (!dealer) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Dealer not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: dealer,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch dealer',
        });
    }
};
exports.getDealer = getDealer;
const updateDealer = async (req, res) => {
    try {
        const dealer = await dealer_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!dealer) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Dealer not found',
            });
            return;
        }
        res.status(http_status_1.OK).json({
            success: true,
            data: dealer,
        });
    }
    catch (error) {
        res.status(http_status_1.BAD_REQUEST).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update dealer',
        });
    }
};
exports.updateDealer = updateDealer;
const deleteDealer = async (req, res) => {
    try {
        const dealer = await dealer_model_1.default.findByIdAndDelete(req.params.id);
        if (!dealer) {
            res.status(http_status_1.NOT_FOUND).json({
                success: false,
                error: 'Dealer not found',
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
            error: error instanceof Error ? error.message : 'Failed to delete dealer',
        });
    }
};
exports.deleteDealer = deleteDealer;
