import { Prisma, UpcomingService } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { UpcomingServiceSearchableFields } from './upcoming.constants';
import { IUpcomingServiceFilterRequest } from './upcoming.interface';

const insertIntoDb = async (
  data: UpcomingService
): Promise<UpcomingService> => {
  const result = await prisma.upcomingService.create({ data });
  return result;
};

const getAllData = async (
  filters: IUpcomingServiceFilterRequest,
  options: IPaginationOptions
) => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: UpcomingServiceSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UpcomingServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.upcomingService.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.upcomingService.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      size,
    },
    data: result,
  };
};

const getOneData = async (id: string): Promise<UpcomingService | null> => {
  const result = await prisma.upcomingService.findUnique({
    where: { id },
  });
  return result;
};

const deleteData = async (id: string): Promise<UpcomingService | null> => {
  const result = await prisma.upcomingService.delete({
    where: { id },
  });
  return result;
};

const updateData = async (
  id: string,
  data: Partial<UpcomingService>
): Promise<UpcomingService | null> => {
  const result = await prisma.upcomingService.update({
    where: { id },
    data: data,
  });
  return result;
};

export const upcomingService = {
  insertIntoDb,
  getAllData,
  getOneData,
  updateData,
  deleteData,
};
