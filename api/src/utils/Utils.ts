import {Response} from 'express';

export function sendError(res: Response, code: number, message: string) {
    res.status(code).send({
        status: code,
        error: message
    });
}