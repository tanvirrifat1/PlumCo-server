import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/signup', AuthController.insertIntoDb);
router.post('/login', AuthController.SignInUser);

export const AuthRoutes = router;
