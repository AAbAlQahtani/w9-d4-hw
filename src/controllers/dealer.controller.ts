import { Request, Response } from 'express';
import CarDealer from '../models/dealer.model'; 
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from '../utils/http-status';

export const createDealer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, city } = req.body;

    if (!name || !email || !city) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'Name, email, and city are required',
      });
      return;
    }

    const dealer = await CarDealer.create({ name, email, city });
    res.status(CREATED).json({
      success: true,
      data: dealer,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create dealer',
    });
  }
};

export const getDealers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const dealers = await CarDealer.find().sort({ createdAt: -1 });
    res.status(OK).json({
      success: true,
      data: dealers,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch dealers',
    });
  }
};

export const getDealer = async (req: Request, res: Response): Promise<void> => {
  try {
    const dealer = await CarDealer.findById(req.params.id);
    if (!dealer) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Dealer not found',
      });
      return;
    }

    res.status(OK).json({
      success: true,
      data: dealer,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch dealer',
    });
  }
};

export const updateDealer = async (req: Request, res: Response): Promise<void> => {
  try {
    const dealer = await CarDealer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!dealer) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Dealer not found',
      });
      return;
    }

    res.status(OK).json({
      success: true,
      data: dealer,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update dealer',
    });
  }
};

export const deleteDealer = async (req: Request, res: Response): Promise<void> => {
  try {
    const dealer = await CarDealer.findByIdAndDelete(req.params.id);
    if (!dealer) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Dealer not found',
      });
      return;
    }

    res.status(OK).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete dealer',
    });
  }
};
