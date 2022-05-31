import { NextFunction, Request, Response } from "express";
import {verify} from "jsonwebtoken";
import Config from "../Config";
import { getUser } from "../handlers/Users";
import MeUser from "../models/user/MeUser";
import { collections } from "../services/database.service";
import { sendError } from "../utils/Utils";

let noAuth: (string|RegExp)[] = [
    //authentication
    "/v2/auth/signup",
    "/v2/auth/login",

    //hello
    "/v2/hello",

    //posts
    "/v2/posts/",
    "/v2/profiles/",
    
    //OEmbed
    "/v2/oembed",
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
			if (typeof x === "string") return req.originalUrl.startsWith(x);
			return x.test(req.url);
		})
        if (bypass) return next();
        const token = req.headers.authorization;
        if(!token) return sendError(res, 401, "No token provided");
        verify(token, Config.JWT_SECRET, async (err, decoded) => {
            if(err) return sendError(res, 401, "Unauthorized");
            let info = decoded as {
                id: string;
                v: number;
            };
            let currentUser = await getUser(info.id, true);
            if(!currentUser) return sendError(res, 403, "Unauthorized");
            let isCorrectVersion = await collections.users.findOne({id: info.id, tokenVersion: info.v});
            if(!isCorrectVersion) return sendError(res, 403, "Unauthorized");
            req.me = currentUser as MeUser;
            if(req.me.suspended) return sendError(res, 403, "Unauthorized");
            return next();
        });
        
    }
}