import { z } from 'zod';

const create = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'userId is required',
    }),
    serviceId: z.string({
      required_error: 'serviceId is required',
    }),
    review: z.string({
      required_error: 'review is required',
    }),
    rating: z.number({
      required_error: 'rating is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    userId: z.string().optional(),
    serviceId: z.string().optional(),
    review: z.string().optional(),
    rating: z.string().optional(),
  }),
});

export const ReviewValidation = { create, update };
