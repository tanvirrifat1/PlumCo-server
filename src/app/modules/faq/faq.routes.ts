import express from 'express';
import { FaqController } from './faq.controller';

const router = express.Router();

router.post('/', FaqController.insertIntoDb);

export const FaqRouter = router;
