import express from 'express';
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
  validateRequest(UserValidation.update),
  UserController.updateUser
);
router.delete('/:id', UserController.deleteUser);
router.get('/', UserController.getUserFromDb);
router.get('/:id', UserController.getSingleData);

export const UserRouter = router;
