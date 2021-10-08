import { Response } from "express";
import jwt from "jsonwebtoken";

export function generateToken(userID: string): string {
    return jwt.sign({ userID: userID }, process.env.APP_SECRET as string, { expiresIn: '24h' });
}

export function signUser(expressResponse: Response, token: string) {
    expressResponse.cookie('garden-user-token', token, {
        httpOnly: true,
        maxAge: 1000000
    });
}