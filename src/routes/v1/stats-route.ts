import express, { Request, Response } from 'express';
import authentication from '../../middleware/auth';
import createResponse from '../../factory/response-factory';
import StatsController from '../../database/controllers/stats-controller';
import UserController from '../../database/controllers/user-controller';
import ControllerInstanceManager from '../../garden/utils/database-instance';

const statsRouter = express.Router();

statsRouter.get('/global', authentication, async (req: Request, res: Response, next) => {
    let date = req.query.date;
    if (!date) {
        return next(createResponse(400, "Invalid Date"));
    }
    try {
        const data = await StatsController.getStatsByDate(date as string);
        next(createResponse(200, "Ok", data));
    } catch (error) {
        next(error);
    }
});

statsRouter.get('/users', authentication, async (req: Request, res: Response, next) => {
    let action = req.query.action;
    if (!action) {
        return next(createResponse(400, "Invalid Date"));
    } else if ((action as string).includes("Minutes Sat")) {
        action = "STAND_UP";
    }
    try {
        const data = await ControllerInstanceManager.getInstance().getTopUsers(action as string);
        next(createResponse(200, "Ok", data));
    } catch (error) {
        next(error);
    }
});

/*
    totalFruitsHarvested: Number;
    totalFlowersPollinated: Number;
    totalGallonsOfWater: Number;
    totalMinutesSatOnBench: Number;
    totalDecorationsCleaned: Number;
    totalAnimalsPetted: Number;
    totalAnimalsFed: Number;
*/

export default statsRouter;