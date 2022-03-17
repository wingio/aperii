import express, { response, Response } from 'express';
import { connectToDatabase } from "./services/database.service";
import cors from 'cors';
import Log from './middleware/Log';
import Authentication from './middleware/Authentication';
import Errors from './middleware/Errors';
import { v2Router } from './routes/v2';
import UserFlags from './models/user/UserFlags';
import { cdnRouter } from './routes/cdn';
import multer from 'multer';

declare global {
    namespace Express {
        interface Response {
            sendError: (code: number, message: string) => void;
        }
    }
}

(response as any).prototype.sendError = function (code: number, message: string) {
    const _this = this as Response;
    _this.status(code).send({
        status: code,
        error: message
    });
}

connectToDatabase().then(() => {
    console.log("Connected to database");

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(multer().array("avatar", 1));

    app.use(Log());
    app.use(Errors());

    app.use('/v2', Authentication() ,v2Router);
    app.use('/cdn', cdnRouter)

    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });

}).catch((err) => {
    console.log("Error connecting to database: ", err);
});