import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });

  return result;
};

const getUserFromDb = async (data: User) => {
  const result = await prisma.user.findMany({
    where: data,
  });
  return result;
};

const getSingleData = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteUser = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  insertIntoDb,
  getUserFromDb,
  updateUser,
  getSingleData,
  deleteUser,
};
