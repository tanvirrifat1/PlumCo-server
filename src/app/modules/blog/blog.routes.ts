import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';

const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  BlogController.getBlogs
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  BlogController.getBlog
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  BlogController.deleteBlog
);

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(BlogValidation.create),
  BlogController.insertIntoDB
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  // validateRequest(BlogValidation.create),
  BlogController.updatedData
);
export const BlogsRouter = router;
