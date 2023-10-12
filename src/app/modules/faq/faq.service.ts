import { Faq } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (data: Faq): Promise<Faq> => {
  const result = await prisma.faq.create({
    data,
  });

  return result;
};

const getFromDb = async (): Promise<Faq[]> => {
  const result = await prisma.faq.findMany();

  return result;
};

const deleteData = async (id: string): Promise<Faq | null> => {
  const result = await prisma.faq.delete({ where: { id } });

  return result;
};

export const FaqService = { insertIntoDb, getFromDb, deleteData };
