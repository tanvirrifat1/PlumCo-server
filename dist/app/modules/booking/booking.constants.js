"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRelationalFieldsMapper = exports.bookingRelationalFields = exports.bookingSearchableFields = exports.bookingFilterableFields = void 0;
exports.bookingFilterableFields = ['search', 'id', 'status'];
exports.bookingSearchableFields = ['id', 'status'];
exports.bookingRelationalFields = ['userId'];
exports.bookingRelationalFieldsMapper = {
    userId: 'user',
};
