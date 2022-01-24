import { Router, Request, Response } from "express";
import { getPost } from "../../../../handlers/Posts";
import { getUserByUsername } from "../../../../handlers/Users";
import { collections } from "../../../../services/database.service";
import { sendError } from "../../../../utils/Utils";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const { username } = req.parameters;
    var u = await getUserByUsername(username);
    if(!u) {
        sendError(res, 404, "User not found");
        return;
    }
    let posts = await collections.posts.find({author: u.id}).toArray();
    let modelPosts = [];
    for(let p of posts) {
        let modelPost = await getPost(p.id);
        modelPosts.push(modelPost);
    }
    //@ts-ignore
    u.posts = u.suspended ? [] : modelPosts.sort((a, b) => b.createdTimestamp - a.createdTimestamp);
    res.send(u);
});

export default router;