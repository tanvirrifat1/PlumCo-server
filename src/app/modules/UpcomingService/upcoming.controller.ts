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

export const upcomingController = {
  insertIntoDb,
};
