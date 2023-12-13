import { UpcomingService } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (
  data: UpcomingService
): Promise<UpcomingService> => {
  const result = await prisma.upcomingService.create({ data });
  return result;
};

const getAllData = async (): Promise<UpcomingService[]> => {
  const result = await prisma.upcomingService.findMany();
  return result;
};

const getOneData = async (id: string): Promise<UpcomingService | null> => {
  const result = await prisma.upcomingService.findUnique({
    where: { id },
  });
  return result;
};

export const upcomingService = {
  insertIntoDb,
  getAllData,
  getOneData,
};
