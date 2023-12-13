import express from 'express';
import { upcomingController } from './upcoming.controller';

const router = express.Router();

router.get('/', upcomingController.getAllData);
router.get('/:id', upcomingController.getOneData);
router.post('/', upcomingController.insertIntoDb);

export const upcomingRoutes = router;
