import express, { Request, Response } from "express"
import createResponse from "../../factory/response-factory";
import gardenManager from "../../garden/managers/garden-manager";
import Logger from "../../logger/winston-Logger";
import connectionManager from "../../managers/connection-manager";
import authentication from "../../middleware/auth";
import ClientWrapper from "../../wrappers/client-wrapper";

const listenRouter = express.Router();

listenRouter.get('/', authentication, async (req: Request, res: Response, next) => {

    const id = req.body.userID;
    const ip = req.ip;
    const client = new ClientWrapper(id, res, ip);
    res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
      });

    res.flushHeaders();
    if (!(await connectionManager.register(client))) {
        return next(createResponse(403, "The server is busy"));
    }
    console.log(await connectionManager.getGardenersOnline());
    // Setup Server-Sent Events

    // When connection closes
    req.on('close', () => {
        connectionManager.disconnect(id);
    });
});

export default listenRouter;