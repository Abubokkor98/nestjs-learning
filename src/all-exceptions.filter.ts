import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { MyLoggerService } from './my-logger/my-logger.service';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

type MyResponseObj = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const myResponseObj: MyResponseObj = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    // we can add more Prisma Error Types if we want
    if (exception instanceof HttpException) {
      myResponseObj.statusCode = exception.getStatus();
      myResponseObj.response = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      myResponseObj.statusCode = 422;
      myResponseObj.response = exception.message.replaceAll(/\n/g, ' ');
    } else {
      myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      myResponseObj.response = 'Internal Server Error';
    }
    response
      .status(myResponseObj.statusCode)

      .json(myResponseObj);
    this.logger.error(myResponseObj.response, AllExceptionFilter.name);

    super.catch(exception, host);
  }
}
