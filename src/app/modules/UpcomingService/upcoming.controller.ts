import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { upcomingService } from './upcoming.service';

const insertIntoDb = async (req: Request, res: Response) => {
  const result = await upcomingService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'upcoming service created successfully',
    data: result,
  });
};

const getAllData = async (req: Request, res: Response) => {
  const result = await upcomingService.getAllData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'upcoming service fetched successfully',
    data: result,
  });
};

const getOneData = async (req: Request, res: Response) => {
  const result = await upcomingService.getOneData(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single upcoming service fetched successfully',
    data: result,
  });
};

export const upcomingController = {
  insertIntoDb,
  getAllData,
  getOneData,
};
