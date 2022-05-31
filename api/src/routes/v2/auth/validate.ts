import { Router, Request, Response } from "express";
import { collections } from "../../../services/database.service";

const router = Router();
router.post("/", async (req: Request, res: Response) => {
    let user = await collections.users.findOne({ id: req.me.id });
    res.send({
        username: user.username,
        token: req.headers.authorization
    })
});

export default router;