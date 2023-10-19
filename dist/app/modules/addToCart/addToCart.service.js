"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddToCartService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDb = (data, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const isUserExist = yield prisma_1.default.user.findFirst({
        where: {
            id: user.userId,
        },
    });
    if (!isUserExist && (user === null || user === void 0 ? void 0 : user.role) !== user_1.ENUM_USER_ROLE.USER) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "user doesn't exist!");
    }
    if (!data.userId) {
        data.userId = user.userId;
    }
    const isExistAddToCart = yield prisma_1.default.addToCart.findFirst({
        where: { serviceId: data.serviceId, userId: user.userId },
    });
    if (isExistAddToCart) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Already this service added!!!');
    }
    const result = yield prisma_1.default.addToCart.create({
        data,
        include: {
            User: true,
            Service: true,
        },
    });
    return result;
});
const getAllData = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const isExist = yield prisma_1.default.user.findFirst({
        where: {
            id: user.userId,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "user doesn't exist!");
    }
    const result = yield prisma_1.default.addToCart.findMany({
        where: {
            userId: user.userId,
        },
        include: {
            User: true,
            Service: true,
        },
    });
    return result;
});
const getSingleData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.addToCart.findUnique({
        where: { id },
        include: { Service: true, User: true },
    });
    return result;
});
const deleteData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.addToCart.delete({
        where: { id },
        include: { Service: true, User: true },
    });
    return result;
});
exports.AddToCartService = {
    insertIntoDb,
    getAllData,
    getSingleData,
    deleteData,
};
