import { Blog } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (data: Blog): Promise<Blog> => {
  const result = await prisma.blog.create({
    data,
    include: { author: true },
  });

  return result;
};

const getDataFromDb = async (): Promise<Blog[]> => {
  const result = await prisma.blog.findMany({
    include: { author: true },
  });

  return result;
};

const deleteData = async (id: string): Promise<Blog | null> => {
  const result = await prisma.blog.delete({
    where: { id },
    include: { author: true },
  });

  return result;
};

export const BlogService = { insertIntoDb, getDataFromDb, deleteData };
