import express from 'express';
import { AddToCartController } from './addToCart.controller';

const router = express.Router();

router.post('/', AddToCartController.insertIntoDb);

export const AddToCartRouter = router;
