import express, { Application, Router } from "express";
import authRouter from "../auth-route";
import listenRouter from "../listen-route";

export default function registerRoutes(): Router {
    const router = express.Router();
    router.use('/auth', authRouter);
    router.use('/listen', listenRouter);
    return router;
}
