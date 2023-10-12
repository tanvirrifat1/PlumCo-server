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

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await AddToCartService.getAllData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AddToCart fetched successfully',
    data: result,
  });
});

const getSingleData = catchAsync(async (req: Request, res: Response) => {
  const result = await AddToCartService.getSingleData(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single AddToCart successfully',
    data: result,
  });
});

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const result = await AddToCartService.deleteData(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AddToCart deleted successfully',
    data: result,
  });
});

export const AddToCartController = {
  insertIntoDb,
  getAllData,
  getSingleData,
  deleteData,
};
