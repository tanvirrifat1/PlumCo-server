import express from 'express';
import { FeedBackController } from './feedback.controller';

const router = express.Router();

router.post('/', FeedBackController.insertIntoDb);
router.get('/', FeedBackController.getDataFromDb);

export const FeedBackRouter = router;
