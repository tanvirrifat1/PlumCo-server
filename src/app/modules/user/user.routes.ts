import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/create', UserController.insertIntoDb);

export const UserRouter = router;
