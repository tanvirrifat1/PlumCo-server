"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedBackRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const feedback_controller_1 = require("./feedback.controller");
const router = express_1.default.Router();
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), feedback_controller_1.FeedBackController.deleteData);
router.get('/:id', feedback_controller_1.FeedBackController.getSingleData);
router.post('/', feedback_controller_1.FeedBackController.insertIntoDb);
router.get('/', feedback_controller_1.FeedBackController.getDataFromDb);
exports.FeedBackRouter = router;
