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

export const FaqController = {
  insertIntoDb,
};
