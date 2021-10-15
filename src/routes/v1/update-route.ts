import express, { Request, Response } from "express"
import createResponse from "../../factory/response-factory";
import gardenManager from "../../garden/managers/garden-manager";
import connectionManager from "../../managers/connection-manager";
import authentication from "../../middleware/auth";

const updateRouter = express.Router();

updateRouter.post('/', authentication, async (req: Request, res: Response, next) => {

    const id = req.body.userID;
    
    if (!(await connectionManager.isConnected(id))) {
       return next(createResponse(403, "You are not in the garden!"));
    }

    if (!req.body.action) {
        return next(createResponse(400, "Action is not defined."));
    }
    const action = req.body.action;

    if (!req.body.entityId) {
        return next(createResponse(400, "Entity ID is not defined."));
    }
    const entityId = req.body.entityId;
    try {
    await gardenManager.interact(id, action, entityId);
    next(createResponse(200, "Done"))
    } catch (error: any) {
        next(createResponse(500, error.message));
    }
});

export default updateRouter;