import Mongoose from "mongoose";
import httpErrors from 'http-status-enum';
import Logger from "../logger/winston-logger";

import ResponseWrapper from "../wrappers/response-wrapper";
import { NextFunction, Request, Response } from "express";

/*
    Based on the guidelines provided in
    express-boilerplate (https://github.com/hagopj13/node-express-boilerplate)
*/

const errorConverter = (err, req: Request, res: Response, next: NextFunction) => {
    let error = err;
    if (!(error instanceof ResponseWrapper)) {
        let code: number =
            error.statusCode ||
                error instanceof Mongoose.Error ?
                httpErrors.BAD_REQUEST : httpErrors.INTERNAL_SERVER_ERROR;
        // @ts-ignore 
        const message = error.message || httpErrors[code];
        error = new ResponseWrapper(code, message, err.stack, false);
    }
    next(error);
};

const errorHandler = (err: ResponseWrapper, req: Request, res: Response, next: NextFunction) => {

    let code = err.getErrorCode();
    let message = err.getMessage();

    if (process.env.ENV_TYPE === 'PROD' && !err.getCarryOn()) {
        code = httpErrors.INTERNAL_SERVER_ERROR;
        // @ts-ignore
        message = httpErrors[httpErrors.INTERNAL_SERVER_ERROR] as string;
    }

    res.locals.errorMessage = message;

    const response = {
        code: code,
        message,
        ...(process.env.ENV_TYPE === 'DEV' && { stack: err.getJson() }),
    };

    if (process.env.ENV_TYPE === 'DEV') {
        if (code < 500)
        Logger.info(err);
        else
        Logger.error(err);
    }

    res.status(code).send(response);
};

export { errorConverter, errorHandler };