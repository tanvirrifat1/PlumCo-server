import { AddToCart } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (
  data: AddToCart,
  token: string
): Promise<AddToCart> => {
  const user = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

  const isUserExist = await prisma.user.findFirst({
    where: {
      id: user.userId,
    },
  });

  if (!isUserExist && user?.role !== ENUM_USER_ROLE.USER) {
    throw new ApiError(httpStatus.NOT_FOUND, "user doesn't exist!");
  }

  if (!data.userId) {
    data.userId = user.userId;
  }

  const isExistAddToCart = await prisma.addToCart.findFirst({
    where: { serviceId: data.serviceId, userId: user.userId },
  });

  if (isExistAddToCart) {
    throw new ApiError(httpStatus.CONFLICT, 'Already this service added!!!');
  }

  const result = await prisma.addToCart.create({
    data,
    include: {
      User: true,
      Service: true,
    },
  });
  return result;
};

const getAllData = async (token: string): Promise<AddToCart[]> => {
  const user = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

  const isExist = await prisma.user.findFirst({
    where: {
      id: user.userId,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "user doesn't exist!");
  }

  const result = await prisma.addToCart.findMany({
    where: {
      userId: user.userId,
    },
    include: {
      User: true,
      Service: true,
    },
  });
  return result;
};

const getSingleData = async (id: string): Promise<AddToCart | null> => {
  const result = await prisma.addToCart.findUnique({
    where: { id },
    include: { Service: true, User: true },
  });

  return result;
};

const deleteData = async (id: string): Promise<AddToCart | null> => {
  const result = await prisma.addToCart.delete({
    where: { id },
    include: { Service: true, User: true },
  });

  return result;
};

export const AddToCartService = {
  insertIntoDb,
  getAllData,
  getSingleData,
  deleteData,
};
