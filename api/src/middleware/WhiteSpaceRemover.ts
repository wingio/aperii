import { NextFunction, Request, Response } from "express";

export default function WhiteSpaceRemover() {
    return (req: Request, res: Response, next: NextFunction) => {
        req.body = req.body || {};
        Object.keys(req.body).forEach(key => {
            req.body[key] = req.body[key].trim();
        })
        return next();
    }
}