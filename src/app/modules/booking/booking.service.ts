import { Booking } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (token: string, data: Booking): Promise<Booking> => {
  const user = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  console.log(user, 'user');
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }

  if (!data.userId) {
    data.userId = data.userId;
  }

  const isBooked = await prisma.booking.findFirst({
    where: {
      serviceId: data.serviceId,
      date: data.date,
    },
  });

  if (isBooked) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already booked the service');
  }

  const result = await prisma.booking.create({
    data,
    include: {
      user: true,
      service: true,
    },
  });
  return result;
};

const getAllBooks = async (token: string): Promise<Booking[]> => {
  const user = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }
  const result = await prisma.booking.findMany({
    include: { user: true, service: true },
  });
  return result;
};

const getSingleBookeds = async (
  token: string,
  id: string
): Promise<Booking | null> => {
  const user = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }

  const result = await prisma.booking.findUnique({
    where: { id },
    include: { user: true, service: true },
  });
  return result;
};

const updateData = async (
  token: string,
  id: string,
  data: Partial<Booking>
): Promise<Booking | null> => {
  const user = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

  const isExist = await prisma.booking.findFirst({
    where: { id },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'service does not exist!');
  }

  if (user.role === 'admin') {
    const result = await prisma.booking.update({
      where: { id },
      data,
    });
    return result;
  } else {
    const result = await prisma.booking.update({
      where: {
        id,
        userId: user.userId,
      },
      data,
    });
    return result;
  }
};

export const BookingService = {
  insertIntoDb,
  getAllBooks,
  getSingleBookeds,
  updateData,
};
