import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import createResponse from "../factory/response-factory";

export default function authentication(req: Request, res: Response, next) {
    const token = req.cookies["garden-user-token"];
    // Redirect
    if (token == null) {
       res.status(401);
       return res.send(createResponse(401, "Unauthorized").toResponse());
    }

    try {

    jwt.verify(token, process.env.APP_SECRET as string, (err: any, payload: any) => {
        // Redirect
        if (err) {
            res.clearCookie("garden-user-token");
            res.status(401);
            return res.send(createResponse(401, "Invalid Token").toResponse())
        }
        req.body.userID = payload.userID;
        req.body.nickname = payload.nickname;
        next();
    })
    } catch (error) {
        res.status(401);
        return res.send(createResponse(401, "Unauthorized").toResponse());
    }
}