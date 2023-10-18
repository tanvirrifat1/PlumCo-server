import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { AddToCartController } from './addToCart.controller';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.USER), AddToCartController.getAllData);
router.post('/', auth(ENUM_USER_ROLE.USER), AddToCartController.insertIntoDb);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  AddToCartController.getSingleData
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  AddToCartController.deleteData
);

export const AddToCartRouter = router;
