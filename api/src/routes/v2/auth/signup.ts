import { Router, Request, Response } from "express";
import { collections } from "../../../services/database.service";
import { sendError } from "../../../utils/Utils";
import { hash } from "bcrypt"
import { sign } from "jsonwebtoken"
import { Snowflake } from "../../../utils/Snowflake";
import Config from "../../../Config";
const router = Router();

type SignUpBody = {
    email: string;
    password: string;
    displayName: string;
    username: string;
}

router.post("/", async (req: Request, res: Response) => {
    let body: SignUpBody = req.body;
    if(!body.email || !body.password || !body.displayName || !body.username) {
        sendError(res, 400, "Missing required fields");
        return;
    }

    let isUsernameTaken = await collections.users.findOne({  username: body.username });
    if(isUsernameTaken) {
        sendError(res, 400, "Username is already taken");
        return;
    }

    let isEmailTaken = await collections.users.findOne({ email: body.email });
    if(isEmailTaken) {
        sendError(res, 400, "There is an account with this email already");
        return;
    }

    var usernameRegex = /^(?=.*[a-z])?(?=.*[A-Z])?(?=.*\d)?(?!.*[ ])[A-Za-z\d_]{4,32}$/g
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&-.]{8,64}$/g
    var emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/g

    if(!usernameRegex.test(body.username)) {
        sendError(res, 400, "Username can only contain letters, numbers, and underscores and must be between 4 and 32 characters long");
        return;
    }

    if(!passwordRegex.test(body.password)) {
        sendError(res, 400, "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character, and must be between 8 and 64 characters long");
        return;
    }

    if(!emailRegex.test(body.email)) {
        sendError(res, 400, "Email is invalid");
        return;
    }

    hash(body.password, 10, async (err, hash) => {
        if(err) {
            sendError(res, 500, "Failed to create account");
            return;
        }
        let userId = Snowflake.generate();
        let token = sign({ id: userId, v: 1 }, Config.JWT_SECRET);
        let newUser = {
            id: userId,
            joinedTimestamp: Snowflake.deconstruct(userId).timestamp,
            email: body.email,
            displayName: body.displayName,
            username: body.username.toLowerCase(),
            password: hash,
            bio: "",
            banner: "",
            avatar: "",
            verifiedEmail: false,
            suspended: false,
            flags: 0,
            tokenVersion: 1
        }
        await collections.users.insertOne(newUser);
        res.send({
            username: newUser.username,
            token: token
        });
    });
});

export default router;