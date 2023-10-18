import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.insertIntoDb
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.getAllBooks
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.getSingleBookeds
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.updateData
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.deleteData
);

export const BookingRoutes = router;
