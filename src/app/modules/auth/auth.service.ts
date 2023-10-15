import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ISignInData, ISignInResponse } from './auth.interface';

const insertIntoDb = async (data: User) => {
  const hashPass = await bcrypt.hash(data.password, 12);
  data.password = hashPass;

  const result = await prisma.user.create({ data });
  return result;
};

const SignInUser = async (payload: ISignInData): Promise<ISignInResponse> => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'user not found');
  }

  if (isUserExist.password && password) {
    if (!(await bcrypt.compare(password, isUserExist.password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match');
    }
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password is missing');
  }

  const { id: userId, role } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return { accessToken };
};

export const AuthService = { insertIntoDb, SignInUser };
