import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { ProductServiceRoutes } from '../modules/service/service.routes';
import { UserRouter } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRouter,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/service',
    route: ProductServiceRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
