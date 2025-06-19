import { Router } from 'express';
import {
  createCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
  getCarsByDealerId,
  getCarsByMakeId
} from '../controllers/car.controller';

const router = Router();

router.get('/', getCars);
router.get('/dealer/:dealerId', getCarsByDealerId);
router.get('/make/:carMakeId', getCarsByMakeId);
router.post('/', createCar);

router.route('/:id')
  .get(getCar)
  .put(updateCar)
  .delete(deleteCar);

export default router;
