import { NextFunction, Request, Response } from "express";
import HttpError from "../error/HttpError";
import Logger from "../utils/Logger";

export default function Errors() {
    return (err, req: Request, res: Response, next: NextFunction) => {
        if(err) {
            let logger = new Logger("ERROR", req.method.toUpperCase());
            logger.error(err.message);
            if(err instanceof HttpError) {
                res.status(err.statusCode).send({
                    status: err.statusCode,
                    error: err.message
                });
            }
            return;
        }
        return next();
    }
}