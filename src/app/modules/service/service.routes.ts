import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductServiceController } from './service.controller';
import { ServiceValidation } from './service.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(ServiceValidation.create),
  ProductServiceController.insertIntoDb
);

router.get('/:id', ProductServiceController.getSingleData);

router.patch(
  '/:id',
  validateRequest(ServiceValidation.update),
  ProductServiceController.updateData
);

router.delete('/:id', ProductServiceController.deleteData);

router.get('/', ProductServiceController.getAllDataFromDb);

export const ProductServiceRoutes = router;
