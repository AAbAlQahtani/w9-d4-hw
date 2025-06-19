import { Router } from 'express';
import {
  createDealer,
  getDealers,
  getDealer,
  updateDealer,
  deleteDealer,
} from '../controllers/dealer.controller';

const router = Router();

router.route('/')
  .get(getDealers)
  .post(createDealer);

router.route('/:id')
  .get(getDealer)
  .put(updateDealer)
  .delete(deleteDealer);

export default router;
