import { Service } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (data: Service): Promise<Service> => {
  const result = await prisma.service.create({
    data,
  });

  return result;
};

export const ProductService = { insertIntoDb };
