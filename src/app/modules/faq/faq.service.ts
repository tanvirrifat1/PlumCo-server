import { Faq } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (data: Faq): Promise<Faq> => {
  const result = await prisma.faq.create({
    data,
  });

  return result;
};

export const FaqService = { insertIntoDb };
