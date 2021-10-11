import jwt from "jsonwebtoken";

/*
    It's generally not good to save jwt in cookies for session utilities,
    but the stakes for an online garden are pretty low and there are not major problems
*/

export function generateToken(userID: string): string {
    return jwt.sign({ userID: userID }, process.env.APP_SECRET as string, {expiresIn: 9999999});
}
