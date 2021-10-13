import express, { Request, Response } from "express"
import authentication from "../../middleware/auth";
import { generateToken } from "../../utils/jwt-helper";
import createResponse from "../../factory/response-factory";
import ControllerInstanceManager from '../../garden/utils/database-instance';

const authRouter = express.Router();

authRouter.post('/login', async (req: Request, res: Response, next) => {
    const nickname = req.body.nickname;
    if (!nickname) {
        return next(createResponse(400, "Invalid Nickname"));
    }
    const id = await ControllerInstanceManager.getInstance().createUser(nickname);
    const token = generateToken(id, nickname);
    res.cookie('garden-user-token', token, {
        httpOnly: true,
        // Never expire, no risk, no stakes. Ez pz
        maxAge: 3600 * 1000 * 24 * 365 * 10,
        secure: true,
        sameSite: true
    });
    next(createResponse(200, "Success"));
});

authRouter.get('/checkSession', authentication, async (req: Request, res: Response, next) => {
    const id = req.body.userID;
    const nickname = req.body.nickname;
    next(createResponse(200, "Token Valid", {id: id, nickname: nickname}));
});

export default authRouter;