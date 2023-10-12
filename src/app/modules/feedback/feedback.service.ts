import { FeedBack } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (data: FeedBack): Promise<FeedBack> => {
  const result = await prisma.feedBack.create({
    data,
    include: { Service: true, User: true },
  });

  return result;
};

const getDataFromDb = async (): Promise<FeedBack[]> => {
  const result = await prisma.feedBack.findMany({
    include: { Service: true, User: true },
  });

  return result;
};

const deleteData = async (id: string): Promise<FeedBack | null> => {
  const result = await prisma.feedBack.delete({
    where: { id },
    include: { Service: true, User: true },
  });

  return result;
};

export const FeedBackService = { insertIntoDb, getDataFromDb, deleteData };
