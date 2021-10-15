import Mongoose from "mongoose";
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
                400 : 500;
        // @ts-ignore 
        const message = error.message || "Internal Error";
        error = new ResponseWrapper(code, message, err.stack, true);
    }
    next(error);
};

const errorHandler = (err: ResponseWrapper, req: Request, res: Response, next: NextFunction) => {

    let code = err.getErrorCode();
    let message = err.getMessage();

    if (process.env.ENV_TYPE === 'PROD' && !err.getCarryOn()) {
        code = 500;
        message = "Internal Server Error";
    }

    res.locals.errorMessage = message;

    const response = {
        code: code,
        message,
        ...(process.env.ENV_TYPE === 'DEV' && { stack: err.getJson() }),
    };

    Logger.error(err);

    res.status(code).send(response);
};

export { errorConverter, errorHandler };