import { UpcomingService } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (
  data: UpcomingService
): Promise<UpcomingService> => {
  const result = await prisma.upcomingService.create({ data });
  return result;
};

export const upcomingService = {
  insertIntoDb,
};
