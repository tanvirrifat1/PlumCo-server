import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created',
    data: result,
  });
});

// const insertIntoDb = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const result = await UserService.insertIntoDb(req.body);
//     res.send({
//       statusCode: 200,
//       message: 'created',
//       success: true,
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const UserController = {
  insertIntoDb,
};
