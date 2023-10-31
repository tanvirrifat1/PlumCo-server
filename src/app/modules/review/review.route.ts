import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(ReviewValidation.create),
  ReviewController.insertIntoDb
);

router.get('/', ReviewController.getAllData);

router.get('/:id', ReviewController.getSingleData);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), ReviewController.deleteData);

export const ReviewRoutes = router;
