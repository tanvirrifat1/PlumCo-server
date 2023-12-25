"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upcomingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const upcoming_controller_1 = require("./upcoming.controller");
const router = express_1.default.Router();
router.get('/', upcoming_controller_1.upcomingController.getAllData);
router.get('/:id', upcoming_controller_1.upcomingController.getOneData);
router.patch('/:id', upcoming_controller_1.upcomingController.updateData);
router.delete('/:id', upcoming_controller_1.upcomingController.deleteData);
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), upcoming_controller_1.upcomingController.insertIntoDb);
exports.upcomingRoutes = router;
