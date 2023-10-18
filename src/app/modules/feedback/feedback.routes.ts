import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { FeedBackController } from './feedback.controller';

const router = express.Router();

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  FeedBackController.deleteData
);
router.get('/:id', FeedBackController.getSingleData);
router.post('/', FeedBackController.insertIntoDb);
router.get('/', FeedBackController.getDataFromDb);

export const FeedBackRouter = router;
