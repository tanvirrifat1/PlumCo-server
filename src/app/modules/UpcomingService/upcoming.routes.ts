import express from 'express';
import { upcomingController } from './upcoming.controller';

const router = express.Router();

router.post('/', upcomingController.insertIntoDb);

export const upcomingRoutes = router;
