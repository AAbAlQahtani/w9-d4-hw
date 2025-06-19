import { Router } from 'express';
import {
  createCarMake,
  getCarMakes,
  getCarMake,
  updateCarMake,
  deleteCarMake,
} from '../controllers/carmake.controller';

const router = Router();

router.route('/')
  .get(getCarMakes)
  .post(createCarMake);

router.route('/:id')
  .get(getCarMake)
  .put(updateCarMake)
  .delete(deleteCarMake);

export default router;
