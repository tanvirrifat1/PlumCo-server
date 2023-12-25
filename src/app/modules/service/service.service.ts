import { Prisma, Service } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { serviceSearchableFields } from './service.constants';
import { IServiceFilterRequest } from './service.interface';

const insertIntoDb = async (data: Service): Promise<Service> => {
  const result = await prisma.service.create({
    data,
  });

  return result;
};

const getAllDataFromDb = async (
  filters: IServiceFilterRequest,
  options: IPaginationOptions
) => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: serviceSearchableFields.map(field => ({
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

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.service.findMany({
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
  const total = await prisma.service.count({
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

const getSingleData = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
    where: { id },
  });
  return result;
};

const updateData = async (
  id: string,
  payload: Partial<Service>
): Promise<Service> => {
  const result = await prisma.service.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteData = async (id: string): Promise<Service> => {
  const result = await prisma.service.delete({
    where: {
      id,
    },
  });

  return result;
};

const getServiceByCategoryId = async (
  categoryId: string
): Promise<Service[] | null> => {
  const result = await prisma.service.findMany({
    where: { categoryId },
    include: { category: true },
  });
  return result;
};

export const ProductService = {
  insertIntoDb,
  getAllDataFromDb,
  getSingleData,
  updateData,
  deleteData,
  getServiceByCategoryId,
};
