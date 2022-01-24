import { Router, Request, Response } from "express";
import { getPost } from "../../../../handlers/Posts";
import { getUserByUsername } from "../../../../handlers/Users";
import { collections } from "../../../../services/database.service";
import { sendError } from "../../../../utils/Utils";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const { id } = req.parameters;
    let exisits = await collections.posts.findOne({id: id});
    if(!exisits) {
        sendError(res, 404, "Post not found");
        return;
    }
    let posts = await collections.posts.find({in_reply_to: id}).toArray();
    let modelPosts = [];
    for(let p of posts) {
        let modelPost = await getPost(p.id);
        modelPosts.push(modelPost);
    }
    res.send(modelPosts.sort((a, b) => b.createdTimestamp - a.createdTimestamp));
});

export default router;