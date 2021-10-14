import express, { Request, Response } from "express"
import createResponse from "../../factory/response-factory";
import connectionManager from "../../managers/connection-manager";
import authentication from "../../middleware/auth";
import ClientWrapper from "../../wrappers/client-wrapper";

const listenRouter = express.Router();

listenRouter.get('/', authentication, async (req: Request, res: Response, next) => {
    const nickname = req.body.nickname;
    const id = req.body.userID;
    const ip = req.ip;
    const client = new ClientWrapper(id, res, ip, nickname);
    res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
      });

    res.flushHeaders();
    if (!(await connectionManager.register(client))) {
        return next(createResponse(403, "The server is busy"));
    }
    // Setup Server-Sent Events

    // When connection closes
    req.on('close', () => {
        connectionManager.disconnect(id);
    });
});

export default listenRouter;