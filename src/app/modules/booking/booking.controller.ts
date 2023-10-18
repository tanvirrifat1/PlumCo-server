import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookingFilterableFields } from './booking.constants';
import { BookingService } from './booking.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  console.log(token);
  const bookingData = req.body; // Make sure req.body is in the expected format

  // Pass booking data to the function
  const result = await BookingService.insertIntoDb(token, bookingData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking successfully',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookingFilterableFields);
  const options = pick(req.query, paginationFields);
  const token = req.headers.authorization as string;

  const result = await BookingService.getAllBooks(filters, options, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Data retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBookeds = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const { id } = req.params;

  const result = await BookingService.getSingleBookeds(token, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get single Booking successfully',
    data: result,
  });
});

const updateData = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;

  const bookingData = req.body;
  const { id } = req.params;

  const result = await BookingService.updateData(token, id, bookingData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookingService.deleteData(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
});

export const BookingController = {
  insertIntoDb,
  getAllBooks,
  getSingleBookeds,
  updateData,
  deleteData,
};
