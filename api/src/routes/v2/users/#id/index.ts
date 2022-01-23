import { Router, Request, Response } from "express";
import { getUser } from "../../../../handlers/Users";
import { sendError } from "../../../../utils/Utils";
const router = Router();

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

export default router;