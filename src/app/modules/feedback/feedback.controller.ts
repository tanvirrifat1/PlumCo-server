import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';

import sendResponse from '../../../shared/sendResponse';
import { FeedBackService } from './feedback.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedBackService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback created successfully',
    data: result,
  });
});

const getDataFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedBackService.getDataFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FeedBack fetched successfully',
    data: result,
  });
});

export const FeedBackController = {
  insertIntoDb,
  getDataFromDb,
};
