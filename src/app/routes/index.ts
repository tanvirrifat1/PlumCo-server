import express from 'express';
import { upcomingRoutes } from '../modules/UpcomingService/upcoming.routes';
import { AddToCartRouter } from '../modules/addToCart/addToCart.routes';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BlogsRouter } from '../modules/blog/blog.routes';
import { BookingRoutes } from '../modules/booking/booking.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { FaqRouter } from '../modules/faq/faq.routes';
import { FeedBackRouter } from '../modules/feedback/feedback.routes';
import { ProfileRoutes } from '../modules/profile/profile.routes';
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
  {
    path: '/blog',
    route: BlogsRouter,
  },
  {
    path: '/faq',
    route: FaqRouter,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/upcoming',
    route: upcomingRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
