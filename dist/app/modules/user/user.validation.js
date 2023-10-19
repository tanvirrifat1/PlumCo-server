"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'contactNo is required',
        }),
        fullName: zod_1.z.string({
            required_error: 'fullName is required',
        }),
        address: zod_1.z.string({
            required_error: 'address is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email().optional(),
        password: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        fullName: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = { create, update };
