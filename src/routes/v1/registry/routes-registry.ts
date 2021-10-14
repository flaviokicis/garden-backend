import express, { Application, NextFunction, Request, Response, Router } from "express";
import createResponse from "../../../factory/response-factory";
import authRouter from "../auth-route";
import listenRouter from "../listen-route";
import updateRouter from '../update-route';
import statsRouter from '../stats-route';

export default function registerRoutes(): Router {
    const router = express.Router();
    router.use('/auth', authRouter);
    router.use('/listen', listenRouter);
    router.use('/update', updateRouter);
    router.use('/stats', statsRouter);
    // oops... 404 :/
    router.use(async (req: Request, res: Response, next: NextFunction) => {
        next(createResponse(404, "Route not found."))
    });
    return router;
}
