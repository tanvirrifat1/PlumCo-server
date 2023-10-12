import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.create),
  AuthController.insertIntoDb
);
router.post('/login', AuthController.SignInUser);

export const AuthRoutes = router;
