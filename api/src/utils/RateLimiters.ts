import { Request, Response } from "express";
import rl from "express-rate-limit"
import { sendError } from "./Utils"

let rateLimitHandler = (req: Request, res: Response) => sendError(res, 429, "Too many requests, please try again later");

//TODO: More routes
export default class RateLimiters {
    static Auth = rl({
        windowMs: 2 * 60 * 60 * 1000,
        max: 6,
        standardHeaders: true,
        legacyHeaders: true,
        handler: rateLimitHandler
    })
}