import express, { Application, json, Request, Response } from "express";
import helmet from "helmet";
import cors from 'cors';
import cookieParser from "cookie-parser";
import morgan from "morgan";
import RouteRegistry from "../routes/registry/routes-registry";
import Logger from "../logger/winston-logger";
import registerRoutes from "../routes/registry/routes-registry";
import path from "path";


class App {

    private app: Application = express();

    constructor() {
        this.loadDatabase();
        this.loadHeaders();
        this.loadMiddleware();
        this.loadErrorHandling();
        this.loadRoutes();
    }

    private async loadDatabase() {
        // TODO
    }

    private loadHeaders() {
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
    }

    private loadMiddleware() {
        this.app.use(json());
        this.app.use(express.urlencoded({ extended: false }));
        console.log(path.join(__dirname, '../../public'));
        this.app.use(express.static(path.join(__dirname, '../../public')));
        this.app.use(cookieParser());
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(morgan('combined', {
            stream: {
                write: (text: string) => {
                    Logger.info(text)
                }
            }
        }));
    }

    private loadErrorHandling() {

    }

    private loadRoutes() {
        this.app.use('/api', registerRoutes());
    }

    public start(port: string | number) {
        this.app.listen(port, () => {
            Logger.info(`Server listening on port ${port}.`);
        });
    }

}

export default App