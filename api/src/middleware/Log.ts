import { NextFunction, Request, Response } from "express";
import Logger from "../utils/Logger";

export default function Log() {
    return (req: Request, res: Response, next: NextFunction) => {
        let logger = new Logger("DEBUG", req.method.toUpperCase());
        logger.info(`${req.url}`);
        return next();
    }
}