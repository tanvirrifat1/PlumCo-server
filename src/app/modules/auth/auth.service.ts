import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (data: User) => {
  const hashPass = await bcrypt.hash(data.password, 12);
  data.password = hashPass;
  const result = await prisma.user.create({ data });
  return result;
};

export const AuthService = { insertIntoDb };
