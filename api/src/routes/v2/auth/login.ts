import { Router, Request, Response } from "express";
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { collections } from "../../../services/database.service";
import { sendError } from "../../../utils/Utils";
import Config from "../../../Config";
const router = Router();

type LoginBody = {
    username: string;
    password: string;
}

router.post("/", async (req: Request, res: Response) => {
    let body: LoginBody = req.body;
    if(!body.password || !body.username) {
        sendError(res, 400, "Missing required fields");
        return;
    }

    let user = await collections.users.findOne({  username: body.username.toLowerCase() });
    if(!user) {
        sendError(res, 400, "No user found with that username");
        return;
    }

    compare(body.password, user.password, (err, isMatch) => {
        if(err) {
            sendError(res, 500, "Failed to login");
            return;
        }
        if(!isMatch) {
            sendError(res, 400, "Incorrect password");
            return;
        }
        let token = sign({ id: user.id, v: user.tokenVersion }, Config.JWT_SECRET);
        res.json({ username: user.username, token });
    });
});

export default router;