import { User } from '@prisma/client';

import prisma from '../../../shared/prisma';

const myProfile = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: { id },
  });

  return result;
};

const updated = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const result = await prisma.user.update({
    where: { id },
    data: payload,
  });

  return result;
};

export const ProfileService = {
  myProfile,
  updated,
};
