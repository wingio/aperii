import { NextFunction, Request, Response } from "express";
import { getUser, getUserByUsername } from "../handlers/Users";
import User from "../models/user/User";
import Logger from "../utils/Logger";

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

export default function UserParser() {
    return async (req: Request, res: Response, next: NextFunction) => {
        if(!req.parameters.userId) return next();
        if(req.parameters.userId == "@me") {
            req.user = req.me
        } else if (req.parameters.userId.startsWith("@")) {
            
            req.user = await getUserByUsername(req.parameters.userId.substring(1));
        } else {
            req.user = await getUser(req.parameters.userId);
        }
        return next();
    }
}