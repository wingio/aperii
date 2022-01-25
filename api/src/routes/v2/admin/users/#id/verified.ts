import { Request, Response, Router } from "express";
import { getUser } from "../../../../../handlers/Users";
import UserFlags from "../../../../../models/user/UserFlags";
import { collections } from "../../../../../services/database.service";
import { sendError } from "../../../../../utils/Utils";
let router = Router()

router.patch("/", async (req: Request, res: Response) => {
    let { id } = req.parameters;
    if(!req.me.flags.admin){
        sendError(res, 403, "You are not authorized to do this");
    }
    let user = id === "@me" ? req.me : await getUser(id);
    if(!user) {
        sendError(res, 404, "User not found");
        return;
    }
    if(user.flags.verified) {
        user.flags.removeFlag(UserFlags.FLAGS.VERIFIED);
    } else {
        user.flags.addFlag(UserFlags.FLAGS.VERIFIED);
    }
    await collections.users.updateOne({id: user.id}, {$set: {flags: user.flags.getFlags()}});
    res.send(user);
})

export default router