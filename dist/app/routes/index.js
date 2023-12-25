"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upcoming_routes_1 = require("../modules/UpcomingService/upcoming.routes");
const addToCart_routes_1 = require("../modules/addToCart/addToCart.routes");
const auth_route_1 = require("../modules/auth/auth.route");
const blog_routes_1 = require("../modules/blog/blog.routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const category_routes_1 = require("../modules/category/category.routes");
const faq_routes_1 = require("../modules/faq/faq.routes");
const feedback_routes_1 = require("../modules/feedback/feedback.routes");
const profile_routes_1 = require("../modules/profile/profile.routes");
const review_route_1 = require("../modules/review/review.route");
const service_routes_1 = require("../modules/service/service.routes");
const user_routes_1 = require("../modules/user/user.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/user',
        route: user_routes_1.UserRouter,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/service',
        route: service_routes_1.ProductServiceRoutes,
    },
    {
        path: '/review',
        route: review_route_1.ReviewRoutes,
    },
    {
        path: '/booking',
        route: booking_routes_1.BookingRoutes,
    },
    {
        path: '/feedback',
        route: feedback_routes_1.FeedBackRouter,
    },
    {
        path: '/addToCart',
        route: addToCart_routes_1.AddToCartRouter,
    },
    {
        path: '/blog',
        route: blog_routes_1.BlogsRouter,
    },
    {
        path: '/faq',
        route: faq_routes_1.FaqRouter,
    },
    {
        path: '/profile',
        route: profile_routes_1.ProfileRoutes,
    },
    {
        path: '/category',
        route: category_routes_1.CategoryRoutes,
    },
    {
        path: '/upcoming',
        route: upcoming_routes_1.upcomingRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
