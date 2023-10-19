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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const booking_constants_1 = require("./booking.constants");
const insertIntoDb = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'user not found');
    }
    if (!data.userId) {
        data.userId = user.userId;
    }
    const isBooked = yield prisma_1.default.booking.findFirst({
        where: {
            serviceId: data.serviceId,
            date: data.date,
        },
    });
    if (isBooked) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Already booked the service');
    }
    const result = yield prisma_1.default.booking.create({
        data,
        include: {
            user: true,
            service: true,
        },
    });
    return result;
});
const getAllBooks = (filters, options, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'user not found');
    }
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search } = filters, filterData = __rest(filters, ["search"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: booking_constants_1.bookingSearchableFields.map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (booking_constants_1.bookingRelationalFields.includes(key)) {
                    return {
                        [booking_constants_1.bookingRelationalFieldsMapper[key]]: {
                            id: filterData[key],
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filterData[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const getConditions = (user === null || user === void 0 ? void 0 : user.role) === user_1.ENUM_USER_ROLE.USER
        ? { userId: user === null || user === void 0 ? void 0 : user.userId }
        : whereConditions;
    const result = yield prisma_1.default.booking.findMany({
        where: getConditions,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
        include: {
            user: true,
            service: true,
        },
    });
    const total = yield prisma_1.default.booking.count({
        where: whereConditions,
    });
    const subtotal = yield prisma_1.default.booking.count();
    const totalPage = Math.ceil(subtotal / size);
    return {
        meta: {
            total,
            page,
            size,
            totalPage,
        },
        data: result,
    };
});
const getSingleBookeds = (token, id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'user not found');
    }
    const result = yield prisma_1.default.booking.findUnique({
        where: { id },
        include: { user: true, service: true },
    });
    return result;
});
const deleteData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.delete({
        where: { id },
        include: { user: true, service: true },
    });
    return result;
});
const updateData = (token, id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const isExist = yield prisma_1.default.booking.findFirst({
        where: { id },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'service does not exist!');
    }
    if (user.role === user_1.ENUM_USER_ROLE.ADMIN ||
        user.role === user_1.ENUM_USER_ROLE.SUPER_ADMIN) {
        const result = yield prisma_1.default.booking.update({
            where: { id },
            data,
        });
        return result;
    }
    else {
        const result = yield prisma_1.default.booking.update({
            where: {
                id,
                userId: user.userId,
            },
            data,
        });
        return result;
    }
});
exports.BookingService = {
    insertIntoDb,
    getAllBooks,
    getSingleBookeds,
    updateData,
    deleteData,
};
