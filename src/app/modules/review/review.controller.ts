import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';

import sendResponse from '../../../shared/sendResponse';
import { ReviewService } from './review.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'review created successfully',
    data: result,
  });
});

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getAllData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'review fetched successfully',
    data: result,
  });
});

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.deleteData(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'review fetched successfully',
    data: result,
  });
});

export const ReviewController = {
  insertIntoDb,
  getAllData,
  deleteData,
};
