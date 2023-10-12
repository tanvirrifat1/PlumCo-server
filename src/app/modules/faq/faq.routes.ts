import express from 'express';
import { FaqController } from './faq.controller';

const router = express.Router();

router.post('/', FaqController.insertIntoDb);
router.get('/', FaqController.getFromDb);
router.delete('/:id', FaqController.deleteData);

export const FaqRouter = router;
