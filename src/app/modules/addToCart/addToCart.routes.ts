import express from 'express';
import { AddToCartController } from './addToCart.controller';

const router = express.Router();

router.post('/', AddToCartController.insertIntoDb);
router.get('/', AddToCartController.getAllData);
router.get('/:id', AddToCartController.getSingleData);
router.delete('/:id', AddToCartController.deleteData);

export const AddToCartRouter = router;
