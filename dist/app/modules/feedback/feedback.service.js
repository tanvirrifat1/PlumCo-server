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
exports.FeedBackService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedBack.create({
        data,
        include: { Service: true, User: true },
    });
    return result;
});
const getDataFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedBack.findMany({
        include: { Service: true, User: true },
    });
    return result;
});
const deleteData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedBack.delete({
        where: { id },
        include: { Service: true, User: true },
    });
    return result;
});
const getSingleData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedBack.findUnique({
        where: { id },
        include: { Service: true, User: true },
    });
    return result;
});
exports.FeedBackService = {
    insertIntoDb,
    getDataFromDb,
    deleteData,
    getSingleData,
};
