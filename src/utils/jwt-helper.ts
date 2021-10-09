import { Response } from "express";
import jwt from "jsonwebtoken";

/*
    It's generally not good to save jwt in cookies for session utilities,
    but the stakes for an online garden are pretty low and there are not major problems
*/

export function generateToken(userID: string): string {
    return jwt.sign({ userID: userID }, process.env.APP_SECRET as string);
}

export function signUser(expressResponse: Response, token: string) {
    expressResponse.cookie('garden-user-token', token, {
        httpOnly: true,
        maxAge: 1000000
    });
}