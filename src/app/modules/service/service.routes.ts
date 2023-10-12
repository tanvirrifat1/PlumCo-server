import express from 'express';
import { ProductServiceController } from './service.controller';

const router = express.Router();

router.post('/', ProductServiceController.insertIntoDb);

export const ProductServiceRoutes = router;
