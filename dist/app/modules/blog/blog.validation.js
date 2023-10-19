"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is Required!' }),
        content: zod_1.z.string({ required_error: 'Content is Required!' }),
        image: zod_1.z.string({ required_error: 'image is Required!' }),
        published: zod_1.z
            .boolean({ required_error: 'published is Required!' })
            .optional(),
        authorId: zod_1.z.string({ required_error: 'Author Id is Required!' }).optional(),
    }),
});
exports.BlogValidation = {
    create,
};
