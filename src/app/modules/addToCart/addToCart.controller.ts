import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';

import sendResponse from '../../../shared/sendResponse';
import { AddToCartService } from './addToCart.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await AddToCartService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AddToCart created successfully',
    data: result,
  });
});

export const AddToCartController = {
  insertIntoDb,
};
