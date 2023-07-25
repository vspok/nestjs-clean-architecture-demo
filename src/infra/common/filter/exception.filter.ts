import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { LoggerService } from 'src/infra/services/logger/logger.service';

interface IError {
    message: string[];
    error: string | number;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: LoggerService) {}
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request: any = ctx.getRequest();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        const message =
            exception instanceof HttpException
                ? (exception.getResponse() as IError)
                : { message: [(exception as Error).message], error: status };

        const responseData = {
            ...{
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            },
            ...message,
        };

        this.logMessage(request, message, status, exception);

        response.status(status).json(responseData);
    }

    private logMessage(
        request: any,
        message: IError,
        status: number,
        exception: any,
    ) {
        if (status === 500) {
            this.logger.error(
                `End Request for ${request.path}`,
                `method=${request.method} status=${status} error=${
                    message.error ? message.error : null
                } message=${message.message ? message.message : null}`,
                status >= 500 ? exception.stack : '',
            );
        } else {
            this.logger.warn(
                `End Request for ${request.path}`,
                `method=${request.method} status=${status} error=${
                    message.error ? message.error : null
                } message=${message.message ? message.message : null}`,
            );
        }
    }
}
