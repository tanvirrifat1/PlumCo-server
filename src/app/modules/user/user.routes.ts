import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/create', UserController.insertIntoDb);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.get('/', UserController.getUserFromDb);
router.get('/:id', UserController.getSingleData);

export const UserRouter = router;
