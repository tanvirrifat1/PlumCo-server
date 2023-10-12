import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
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
  const token = req.headers.authorization as string;
  console.log(token);

  // Pass booking data to the function
  const result = await BookingService.getAllBooks(token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking fetched successfully',
    data: result,
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
    message: 'Booking successfully',
    data: result,
  });
});

export const BookingController = {
  insertIntoDb,
  getAllBooks,
  getSingleBookeds,
  updateData,
};
