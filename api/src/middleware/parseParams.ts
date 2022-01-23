import { NextFunction, Request, Response } from "express";
declare global {
    namespace Express {
        interface Request {
            parameters: ParameterDictionary;
        }
    }
    type ParameterDictionary = {
        [key: string]: string;
    };
}

export default function parseParams() {
    return (req: Request, res: Response, next: NextFunction) => {
        req.parameters = req.params || {};
        return next();
    }
}