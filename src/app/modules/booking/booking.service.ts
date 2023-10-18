import { Booking, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  bookingRelationalFields,
  bookingRelationalFieldsMapper,
  bookingSearchableFields,
} from './booking.constants';
import { IBookedFilterRequest } from './booking.interface';

const insertIntoDb = async (token: string, data: Booking): Promise<Booking> => {
  const user = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }

  if (!data.userId) {
    data.userId = user.userId;
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

const getAllBooks = async (
  filters: IBookedFilterRequest,
  options: IPaginationOptions,
  token: string
): Promise<IGenericResponse<Booking[] | null>> => {
  const user = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }

  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: bookingSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (bookingRelationalFields.includes(key)) {
          return {
            [bookingRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const getConditions =
    user?.role === ENUM_USER_ROLE.USER
      ? { userId: user?.userId }
      : whereConditions;

  const result = await prisma.booking.findMany({
    where: getConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
    include: {
      user: true,
      service: true,
    },
  });
  const total = await prisma.booking.count({
    where: whereConditions,
  });

  const subtotal = await prisma.booking.count();

  const totalPage = Math.ceil(subtotal / size);

  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: result,
  };
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

const deleteData = async (id: string): Promise<Booking | null> => {
  const result = await prisma.booking.delete({
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

  if (
    user.role === ENUM_USER_ROLE.ADMIN ||
    user.role === ENUM_USER_ROLE.SUPER_ADMIN
  ) {
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
  deleteData,
};
