import { AddToCart } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (data: AddToCart): Promise<AddToCart> => {
  const result = await prisma.addToCart.create({
    data,
    include: { Service: true, User: true },
  });

  return result;
};

export const AddToCartService = { insertIntoDb };
