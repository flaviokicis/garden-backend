import express, { Request, Response } from "express"
import authentication from "../../middleware/auth";
import { generateToken } from "../../utils/jwt-helper";
import createResponse from "../../factory/response-factory";

const authRouter = express.Router();

authRouter.post('/login', async (req: Request, res: Response, next) => {
    const nickname = req.body.nickname;
    const token = generateToken(nickname);
    res.cookie('garden-user-token', token, {
        httpOnly: true,
        // Never expire, no risk, no stakes. Ez pz
        maxAge: 3600 * 1000 * 24 * 365 * 10,
        secure: true,
        sameSite: true
    });
    next(createResponse(200, "Success"));
});

authRouter.get('/checkSession', async (req: Request, res: Response, next) => {
    const nickname = req.body.userID;
    next(createResponse(200, "Token Valid"));
});

export default authRouter;