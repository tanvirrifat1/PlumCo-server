import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { FaqController } from './faq.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FaqController.insertIntoDb
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FaqController.updatedData
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FaqController.getSingleData
);
router.get('/', FaqController.getFromDb);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FaqController.deleteData
);

export const FaqRouter = router;
