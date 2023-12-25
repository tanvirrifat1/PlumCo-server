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
exports.upcomingController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const upcoming_constants_1 = require("./upcoming.constants");
const upcoming_service_1 = require("./upcoming.service");
const insertIntoDb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield upcoming_service_1.upcomingService.insertIntoDb(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'upcoming service created successfully',
        data: result,
    });
});
const getAllData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, upcoming_constants_1.upcomingServiceFilterableFields);
    const options = (0, pick_1.default)(req.query, ['size', 'page', 'sortBy', 'sortOrder']);
    const result = yield upcoming_service_1.upcomingService.getAllData(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'upcoming service fetched successfully',
        meta: result.meta,
        data: result.data,
    });
});
const getOneData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield upcoming_service_1.upcomingService.getOneData(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'single upcoming service fetched successfully',
        data: result,
    });
});
const deleteData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield upcoming_service_1.upcomingService.deleteData(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: ' upcoming service Deleted successfully',
        data: result,
    });
});
const updateData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield upcoming_service_1.upcomingService.updateData(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'upcoming service updated successfully',
        data: result,
    });
});
exports.upcomingController = {
    insertIntoDb,
    getAllData,
    getOneData,
    updateData,
    deleteData,
};
