import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { serviceFilterableFields } from './service.constants';
import { ProductService } from './service.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully',
    data: result,
  });
});

const getAllDataFromDb = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await ProductService.getAllDataFromDb(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleData = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getSingleData(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single service successfully',
    data: result,
  });
});

const updateData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductService.updateData(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'data updated successfully',
    data: result,
  });
});

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductService.deleteData(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'data deleted successfully',
    data: result,
  });
});

export const ProductServiceController = {
  insertIntoDb,
  getAllDataFromDb,
  getSingleData,
  updateData,
  deleteData,
};
