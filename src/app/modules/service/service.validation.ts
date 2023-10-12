import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    description: z.string({
      required_error: 'description is required',
    }),
    price: z.string({
      required_error: 'price is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    role: z.string().optional(),
    price: z.string().optional(),
  }),
});

export const ServiceValidation = { create, update };
