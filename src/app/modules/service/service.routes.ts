import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ProductServiceController } from './service.controller';
import { ServiceValidation } from './service.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),

  validateRequest(ServiceValidation.create),
  ProductServiceController.insertIntoDb
);

router.get(
  '/category/:categoryId',
  ProductServiceController.getServiceByCategoryId
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
