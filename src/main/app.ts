import express, { Application, json, Request, Response } from "express";
import helmet from "helmet";
import cors from 'cors';
import cookieParser from "cookie-parser";
import morgan from "morgan";
import Logger from "../logger/winston-logger";
import registerRoutes from "../routes/v1/registry/routes-registry";
import path from "path";
import MongoDatabase from "../database/mongo-connector";
import xssSanitizer from 'xss-clean';
import mongoSanitizer from 'express-mongo-sanitize';
import { errorConverter, errorHandler } from "../middleware/error-handler";
import gardenManager from "../garden/managers/garden-manager";
import NodeCronScheduler from "../implementations/nc-scheduler";
import ControllerInstanceManager from '../garden/utils/database-instance';
import UserController from "../database/controllers/user-controller";
import connectionManager from "../managers/connection-manager";

class App {

    private app: Application = express();

    private db: MongoDatabase = new MongoDatabase();

    constructor() {
        this.loadDatabase();
        this.setHeaders();
        this.loadMiddleware();
        this.loadGarden();
        this.loadRoutes();
        this.setDisable();
    }

    private async loadDatabase() {
        await this.db.connect(process.env.MONGO_URL as string);
        ControllerInstanceManager.setInstance(new UserController());
    }

    private setHeaders() {
        this.app.use(function (req: Request, res: Response, next) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept"
            );
            res.setHeader(
                "Access-Control-Expose-Headers",
                "Total-Elements, Total-Pages, Current-Page"
            );
            res.setHeader(
                "Access-Control-Allow-Methods",
                "GET, POST, PUT, PATCH, DELETE"
            );
            next();
        });
        this.app.set('trust proxy', true)
    }

    private loadMiddleware() {
        // Use Json and serve React
        this.app.use(json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.static(path.join(__dirname, '../../public')));
        // Cookie
        this.app.use(cookieParser());
        // Security 
        this.app.use(helmet());
        this.app.use(xssSanitizer());
        this.app.use(mongoSanitizer());
        const corsConfig = {
            credentials: true,
            origin: true,
        };
        this.app.use(cors(corsConfig));
        // Logger
        this.app.use(morgan('combined', {
            stream: {
                write: (text: string) => {
                    Logger.info(text)
                }
            }
        }));
    }

    private loadGarden() {
        gardenManager.setScheduler(new NodeCronScheduler())
        gardenManager.setupGarden();
        gardenManager.startFruitSpawn();
    }

    private loadRoutes() {
        this.app.use('/api/v1', registerRoutes());
        // Convert and handle
        this.app.use(errorConverter);
        this.app.use(errorHandler);
    }

    public start(port: string | number) {
        this.app.listen(port, () => {
            Logger.info(`Server listening on port ${port}.`);
        });
    }

    public setDisable() {
        process.on('SIGTERM', this.onDisable);
        process.on('SIGINT', this.onDisable);
    }

    public onDisable() {
        Logger.info("Closing all connections...");
        connectionManager.disconnectAll();
    }

}

export default App