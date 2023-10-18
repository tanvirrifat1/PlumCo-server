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

const getSingleData = async (id: string): Promise<Faq | null> => {
  const result = await prisma.faq.findUnique({ where: { id } });

  return result;
};

const updatedData = async (
  id: string,
  payload: Partial<Faq>
): Promise<Faq | null> => {
  const result = await prisma.faq.update({
    where: { id },
    data: payload,
  });

  return result;
};

export const FaqService = {
  insertIntoDb,
  getFromDb,
  deleteData,
  getSingleData,
  updatedData,
};
