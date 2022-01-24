import { NextFunction, Request, Response } from "express";
import {verify} from "jsonwebtoken";
import Config from "../Config";
import HttpError from "../error/HttpError";
import { getUser } from "../handlers/Users";
import MeUser from "../models/user/MeUser";
import { collections } from "../services/database.service";
import Logger from "../utils/Logger";

let noAuth: (string|RegExp)[] = [
    //authentication
    "/v2/auth/signup",
    "/v2/auth/login",

    //hello
    "/v2/hello",

    //posts
    "/v2/posts/",
    "/v2/profiles/"
];

declare global {
    namespace Express {
        interface Request {
            me: MeUser
        }
    }
}

export default function Authentication() {
    return (req: Request, res: Response, next: NextFunction) => {
        let bypass = noAuth.some((x) => {
			if (typeof x === "string") return req.url.startsWith(x);
			return x.test(req.url);
		})
        if (bypass) return next();
        const token = req.headers.authorization;
        if(!token) throw new HttpError(401, "Unauthorized");
        verify(token, Config.JWT_SECRET, async (err, decoded) => {
            if(err) return next(new HttpError(403, "Unauthorized"));
            let info = decoded as {
                id: string;
                v: number;
            };
            let currentUser = await getUser(info.id, true);
            if(!currentUser) return next(new HttpError(403, "Unauthorized"));
            let isCorrectVersion = await collections.users.findOne({id: info.id, tokenVersion: info.v});
            if(!isCorrectVersion) return next(new HttpError(403, "Unauthorized"));
            req.me = currentUser as MeUser;
            return next();
        });
        
    }
}