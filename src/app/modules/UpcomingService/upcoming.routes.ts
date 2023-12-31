import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { upcomingController } from './upcoming.controller';

const router = express.Router();

router.get('/', upcomingController.getAllData);
router.get('/:id', upcomingController.getOneData);
router.patch('/:id', upcomingController.updateData);
router.delete('/:id', upcomingController.deleteData);
router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  upcomingController.insertIntoDb
);

export const upcomingRoutes = router;
