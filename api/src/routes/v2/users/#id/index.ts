import axios, { AxiosResponse } from "axios";
import { Router, Request, Response } from "express";
import FormData from "form-data";
import Config from "../../../../Config";
import { getUser, getUserByUsername } from "../../../../handlers/Users";
import { collections } from "../../../../services/database.service";
import Logger from "../../../../utils/Logger";
import { sendError } from "../../../../utils/Utils";
const router = Router();

type EditUserBody = {
    username?: string,
    bio?: string,
    avatar?: string,
    displayName?: string,
    pronouns?: string
};

type EditUserError = {
    status: number,
    error: string,
    field: string
};

router.get("/", async (req: Request, res: Response) => {
    let id = req.parameters.id;
    if(id === "@me" || id === req.me.id) {
        res.send(req.me);
        return;
    }

    let user = await getUser(id);
    if(!user) {
        sendError(res, 404, "User not found");
        return;
    }
    res.send(user);
});

router.patch("/", async (req: Request, res: Response) => {
    let {id} = req.parameters;
    let u = id == "@me" ? req.me : await getUser(id);
    if(!u) {
        sendError(res, 404, "User not found");
        return;
    }
    if(u.id !== req.me.id) {
        sendError(res, 403, "You are not allowed to edit this user");
        return;
    }
    let body: EditUserBody = req.body;
    let errors: EditUserError[] = [];
    var usernameRegex = /^(?=.*[a-z])?(?=.*[A-Z])?(?=.*\d)?(?!.*[ ])[A-Za-z\d_]{4,32}$/g
    let bioRegex = /^[\d\D]{0,64}$/g
    let displayNameRegex = /^[\d\D]{4,32}$/g
    let pronounRegex = /^[\d\D]{1,5}\/[\d\D]{1,5}$/g
    if(body.username) {
        if(!usernameRegex.test(body.username)) {
            errors.push({
                status: 400,
                error: "Username must be at least 4 characters long and only contain letters, numbers, and underscores.",
                field: "username"
            });
        }
        let existing = await getUserByUsername(body.username);
        if(existing) {
            errors.push({
                status: 400,
                error: "Username already taken.",
                field: "username"
            });
        }
        if(errors.filter(e => e.field === "username").length == 0) {
            collections.users.updateOne({id: u.id}, {$set: {username: body.username.toLowerCase()}});
            u.username = body.username.toLowerCase();
        }
    }

    if(body.bio) {
        if(!bioRegex.test(body.bio)) {
            errors.push({
                status: 400,
                error: "Bio must be less than 64 characters.",
                field: "bio"
            });
        }
        if(errors.filter(e => e.field === "bio").length == 0) {
            collections.users.updateOne({id: u.id}, {$set: {bio: body.bio}});
            u.bio = body.bio;
        }
    }

    if((req.files as Express.Multer.File[])?.find(f => f.fieldname == "avatar")) {
        try {
            let image = (req.files as Express.Multer.File[]).find(f => f.fieldname == "avatar");
            if(image.mimetype !== "image/png" && image.mimetype !== "image/jpeg" && image.mimetype !== "image/jpg" && image.mimetype !== "image/gif") {
                errors.push({
                    status: 400,
                    error: "Invalid file type.",
                    field: "avatar"
                });
            }
            if(errors.filter(e => e.field === "avatar").length == 0) {
                let av = await collections.cdn.findOne({id: u.id, type: 0});
                if(av) {
                    collections.cdn.deleteOne({id: u.id, type: 0});
                    let cfDelete = axios.delete(`https://api.cloudflare.com/client/v4/accounts/${Config.CF_ACCOUNT_ID}/images/v1/${av.image_id}`, {
                        headers: {
                            "authorization": `Bearer ${Config.CF_API_KEY}`}
                        });
                    await cfDelete;
                }
                let fdata = new FormData();
                fdata.append("file", image.buffer);
                let avData = (await axios.post(`https://api.cloudflare.com/client/v4/accounts/${Config.CF_ACCOUNT_ID}/images/v1`, fdata, {
                headers: {
                    "authorization": `Bearer ${Config.CF_API_KEY}`,
                    ...fdata.getHeaders()
                }})).data;
                let imageData = await collections.cdn.insertOne({
                    type: 0,
                    image_id: avData.result.id,
                    id: u.id
                });
                collections.users.updateOne({id: u.id}, {$set: {avatar: u.id}});
                u.avatar = u.id;
            }
        } catch(e) {
            new Logger("DEBUG").error("Error uploading avatar", e);
            errors.push({
                status: 400,
                error: "Cloudflare API error.",
                field: "avatar"
            });
        }
    }

    if(body.pronouns) {
        if(!pronounRegex.test(body.pronouns)) {
            errors.push({
                status: 400,
                error: "Pronouns must be a valid format.",
                field: "pronouns"
            });
        }
        if(errors.filter(e => e.field === "pronouns").length == 0) {
            collections.users.updateOne({id: u.id}, {$set: {pronouns: body.pronouns}});
            u.pronouns = body.pronouns;
        }
    }

    if(body.displayName) {
        if(!displayNameRegex.test(body.displayName)) {
            errors.push({
                status: 400,
                error: "Display name must be at least 4 characters long and only contain letters, numbers, and underscores.",
                field: "displayName"
            });
        }
        if(errors.filter(e => e.field === "displayName").length == 0) {
            collections.users.updateOne({id: u.id}, {$set: {displayName: body.displayName}});
            u.displayName = body.displayName;
        }
    }
    if(errors.length > 0) {
        res.status(errors[0].status).send({profile: u, errors});
    } else {
        res.send({profile: u});
    }
});


export default router;