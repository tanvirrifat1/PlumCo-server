import express from 'express';
import { AddToCartRouter } from '../modules/addToCart/addToCart.routes';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookingRoutes } from '../modules/booking/booking.routes';
import { FeedBackRouter } from '../modules/feedback/feedback.routes';
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
  {
    path: '/booking',
    route: BookingRoutes,
  },
  {
    path: '/feedback',
    route: FeedBackRouter,
  },
  {
    path: '/addToCart',
    route: AddToCartRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
