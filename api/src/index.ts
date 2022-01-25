import express from 'express';
import { connectToDatabase } from "./services/database.service";
import cors from 'cors';
import Log from './middleware/Log';
import Authentication from './middleware/Authentication';
import Errors from './middleware/Errors';
import { v2Router } from './routes/v2';
import UserFlags from './models/user/UserFlags';

connectToDatabase().then(() => {
    console.log("Connected to database");

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use(Log());
    app.use(Authentication());
    app.use(Errors());

    app.use('/v2', v2Router);

    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });

}).catch((err) => {
    console.log("Error connecting to database: ", err);
});