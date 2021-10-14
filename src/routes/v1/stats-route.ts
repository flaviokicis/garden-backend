import express, { Request, Response } from 'express';
import authentication from '../../middleware/auth';

const statsRouter = express.Router();

statsRouter.get('/', authentication, async (req: Request, res: Response, next) => {

});

export default statsRouter;