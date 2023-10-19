"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddToCartRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const addToCart_controller_1 = require("./addToCart.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), addToCart_controller_1.AddToCartController.getAllData);
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), addToCart_controller_1.AddToCartController.insertIntoDb);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), addToCart_controller_1.AddToCartController.getSingleData);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), addToCart_controller_1.AddToCartController.deleteData);
exports.AddToCartRouter = router;
