import express, { Request, Response } from "express"
import authentication from "../../middleware/auth";
import { generateToken } from "../../utils/jwt-helper";
import createResponse from "../../factory/response-factory";
import ControllerInstanceManager from '../../garden/utils/database-instance';
import GardenConfig from "../../main/config";

const authRouter = express.Router();

authRouter.post('/login', async (req: Request, res: Response, next) => {
    const nickname = req.body.nickname;
    if (!nickname) {
        return next(createResponse(401, "Invalid Nickname"));
    }
    if (nickname.length > GardenConfig.users.max_nickname_length) {
        return next(createResponse(401, "Nickname too long"));
    }
    var regex = /^[a-zA-Z0-9_]+$/;
    if (!regex.test(nickname)) {
        return next(createResponse(401, "Nickname contains invalid characters"));
    }
    const id = await ControllerInstanceManager.getInstance().createUser(nickname);
    const token = generateToken(id, nickname);
    res.cookie('garden-user-token', token, {
        httpOnly: true,
        // Never expire, no risk, no stakes. Ez pz
        maxAge: 3600 * 1000 * 24 * 365 * 10,
        secure: false,
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