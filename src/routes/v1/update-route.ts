import express, { Request, Response } from "express"
import createResponse from "../../factory/response-factory";
import gardenManager from "../../garden/managers/garden-manager";
import Logger from "../../logger/winston-Logger";
import connectionManager from "../../managers/connection-manager";
import authentication from "../../middleware/auth";
import ClientWrapper from "../../wrappers/client-wrapper";

const listenRouter = express.Router();

const facts = ["Sombras são vermelhas"];
let clients: Array<any> = [];

gardenManager.registerListener((state) => {
    console.log(state);
});

listenRouter.post('/', authentication, async (req: Request, res: Response, next) => {

    const id = req.body.userID;
    
    if (!(await connectionManager.isConnected(id))) {
       return next(createResponse(403, "You are not in the garden right now."));
    }

    if (!req.body.action) {
        return next(createResponse(400, "Action is not defined."));
    }
    const action = req.body.action;

    if (!req.body.entityId) {
        return next(createResponse(400, "Entity ID is not defined."));
    }
    const entityId = req.body.entityId;

    gardenManager.interact(id, action, entityId);
});

export default listenRouter;