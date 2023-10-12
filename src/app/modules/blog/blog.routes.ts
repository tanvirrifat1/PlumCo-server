import express from 'express';
import { BlogController } from './blog.controller';

const router = express.Router();

router.post('/', BlogController.insertIntoDb);
router.get('/', BlogController.getDataFromDb);

export const BlogsRouter = router;