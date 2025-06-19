import { Request, Response } from 'express';
import Car from '../models/car.model';
import CarDealer from '../models/dealer.model';
import CarMake from '../models/carmake.model';
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from '../utils/http-status';

export const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { dealerId, carMakeId, name, price, year, color, wheelsCount } = req.body;

    if (!dealerId || !carMakeId || !name || !price || !year || !color || wheelsCount == null) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'All fields are required',
      });
      return;
    }

    const dealer = await CarDealer.findById(dealerId);
    if (!dealer) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Dealer not found',
      });
      return;
    }

    const carMake = await CarMake.findById(carMakeId);
    if (!carMake) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car make not found',
      });
      return;
    }

    const car = await Car.create({
      dealerId,
      carMakeId,
      name,
      price,
      year,
      color,
      wheelsCount,
    });

    res.status(CREATED).json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create car',
    });
  }
};

export const getCars = async (_req: Request, res: Response): Promise<void> => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.status(OK).json({
      success: true,
      data: cars,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch cars',
    });
  }
};

export const getCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car not found',
      });
      return;
    }

    res.status(OK).json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch car',
    });
  }
};

export const updateCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!car) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car not found',
      });
      return;
    }

    res.status(OK).json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update car',
    });
  }
};

export const deleteCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car not found',
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
      error: error instanceof Error ? error.message : 'Failed to delete car',
    });
  }
};
export const getCarsByDealerId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { dealerId } = req.params;

    if (!dealerId) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'Dealer ID is required',
      });
      return;
    }

    const dealer = await CarDealer.findById(dealerId);
    if (!dealer) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Dealer not found',
      });
      return;
    }

    const cars = await Car.find({ dealerId });
    if (!cars.length) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'No cars found for this dealer',
      });
      return;
    }

    res.status(OK).json({
      success: true,
      data: cars,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get cars by dealer ID',
    });
  }
};

export const getCarsByMakeId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { carMakeId } = req.params;

    if (!carMakeId) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: 'Car make ID is required',
      });
      return;
    }

    const carMake = await CarMake.findById(carMakeId);
    if (!carMake) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'Car make not found',
      });
      return;
    }

    const cars = await Car.find({ carMakeId });
    if (!cars.length) {
      res.status(NOT_FOUND).json({
        success: false,
        error: 'No cars found for this make',
      });
      return;
    }

    res.status(OK).json({
      success: true,
      data: cars,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get cars by make ID',
    });
  }
};
