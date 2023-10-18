import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(UserValidation.create),
  UserController.insertIntoDb
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(UserValidation.update),
  UserController.updateUser
);
router.delete('/:id', UserController.deleteUser);
router.get('/', UserController.getUserFromDb);
router.get('/:id', UserController.getSingleData);

export const UserRouter = router;
