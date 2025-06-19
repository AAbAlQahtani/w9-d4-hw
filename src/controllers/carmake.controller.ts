import { Request, Response } from 'express';
import CarMake from '../models/carmake.model';
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from '../utils/http-status';

export const createCarMake = async (req: Request, res: Response): Promise<void> => {
  try {
    const { country, brand } = req.body;

    if (!country || !brand) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'Country and brand are required',
      });
      return;
    }

    const carMake = await CarMake.create({ country, brand });
    res.status(CREATED).json({
      success: true,
      data: carMake,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create car make',
    });
  }
};

export const getCarMakes = async (_req: Request, res: Response): Promise<void> => {
  try {
    const carMakes = await CarMake.find().sort({ createdAt: -1 });
    res.status(OK).json({
      success: true,
      data: carMakes,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch car makes',
    });
  }
};

export const getCarMake = async (req: Request, res: Response): Promise<void> => {
  try {
    const carMake = await CarMake.findById(req.params.id);
    if (!carMake) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car make not found',
      });
      return;
    }

    res.status(OK).json({
      success: true,
      data: carMake,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch car make',
    });
  }
};

export const updateCarMake = async (req: Request, res: Response): Promise<void> => {
  try {
    const carMake = await CarMake.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!carMake) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car make not found',
      });
      return;
    }

    res.status(OK).json({
      success: true,
      data: carMake,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update car make',
    });
  }
};

export const deleteCarMake = async (req: Request, res: Response): Promise<void> => {
  try {
    const carMake = await CarMake.findByIdAndDelete(req.params.id);
    if (!carMake) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car make not found',
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
      error: error instanceof Error ? error.message : 'Failed to delete car make',
    });
  }
};
