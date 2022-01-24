import { Router, Request, Response } from "express";
import { getPost } from "../../../../handlers/Posts";
import { getUserByUsername } from "../../../../handlers/Users";
import { collections } from "../../../../services/database.service";
import { sendError } from "../../../../utils/Utils";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const { id } = req.parameters;
    if(id == "all") {
        let posts = await collections.posts.find().toArray();
        let modelPosts = [];
        for(let p of posts) {
            let modelPost = await getPost(p.id);
            modelPosts.push(modelPost);
        }
        res.send(modelPosts.sort((a, b) => b.createdTimestamp - a.createdTimestamp));
    } else {
        var p = await getPost(id);
        if(!p) {
            sendError(res, 404, "Post not found");
            return;
        }
        res.send(p);
    }
});

export default router;