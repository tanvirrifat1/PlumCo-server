import { User } from '@prisma/client';

import prisma from '../../../shared/prisma';

const myProfile = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: { id },
  });

  return result;
};

export const ProfileService = {
  myProfile,
};
