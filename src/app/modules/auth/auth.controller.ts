import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully',
    data: result,
  });
});

const SignInUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.SignInUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user Login successfully',
    data: {
      accessToken: result.accessToken,
    },
  });
});

export const AuthController = { insertIntoDb, SignInUser };
