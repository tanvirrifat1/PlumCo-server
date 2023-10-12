import { z } from 'zod';

const create = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    role: z.string({
      required_error: 'role is required',
    }),
    contactNo: z.string({
      required_error: 'contactNo is required',
    }),
    fullName: z.string({
      required_error: 'fullName is required',
    }),
    address: z.string({
      required_error: 'address is required',
    }),
    profileImage: z.string().optional(),
  }),
});

const update = z.object({
  body: z.object({
    email: z.string().email().optional(),
    password: z.string().optional(),
    role: z.string().optional(),
    contactNo: z.string().optional(),
    fullName: z.string().optional(),
    location: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

export const UserValidation = { create, update };
