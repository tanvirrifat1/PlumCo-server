import { Request, Response } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { upcomingServiceFilterableFields } from './upcoming.constants';
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
  const filters = pick(req.query, upcomingServiceFilterableFields);
  const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);
  const result = await upcomingService.getAllData(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'upcoming service fetched successfully',
    meta: result.meta,
    data: result.data,
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
