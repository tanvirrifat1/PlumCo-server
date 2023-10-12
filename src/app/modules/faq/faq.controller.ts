import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';

import sendResponse from '../../../shared/sendResponse';
import { FaqService } from './faq.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq created successfully',
    data: result,
  });
});

const getFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.getFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq fetched successfully',
    data: result,
  });
});

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.deleteData(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq deleted successfully',
    data: result,
  });
});

export const FaqController = {
  insertIntoDb,
  getFromDb,
  deleteData,
};
