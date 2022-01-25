import { Request, Response, Router } from "express";
import { getPost } from "../../../../../handlers/Posts";
import { getUser } from "../../../../../handlers/Users";
import { collections } from "../../../../../services/database.service";
import { Snowflake } from "../../../../../utils/Snowflake";
import { sendError } from "../../../../../utils/Utils";

const router = Router();

type PostBody = {
    body: string;
}

router.get("/", async (req: Request, res: Response) => {
    const { id } = req.parameters;
    var u = id == "@me" ? req.me : await getUser(id);
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
    res.send(u.suspended? [] : modelPosts.sort((a, b) => b.createdTimestamp - a.createdTimestamp));
});

router.post("/", async (req: Request, res: Response) => {
    const { id } = req.parameters;
    var u = id == "@me" ? req.me : await getUser(id);
    if(!u) {
        sendError(res, 404, "User not found");
        return;
    }
    if(u.id !== req.me.id) {
        sendError(res, 403, "You are not allowed to do that");
        return;
    }
    let post: PostBody = req.body;
    let {replyto} = req.query;
    if(!post.body) {
        sendError(res, 400, "Missing body");
        return;
    }
    if(post.body == "") {
        sendError(res, 400, "Body cannot be empty");
        return;
    }
    if(post.body.length > 256) {
        sendError(res, 400, "Body cannot be longer than 256 characters");
        return;
    }
    let postId = Snowflake.generate();
    let hasReplyTo = !!replyto;
    let replyToPost = hasReplyTo ? await getPost(replyto as string) : null;
    if(hasReplyTo && !replyToPost) {
        sendError(res, 400, "Reply to post not found");
        return;
    }
    let postData = {
        id: postId,
        createdTimestamp: Snowflake.deconstruct(postId).timestamp,
        author: u.id,
        body: post.body,
        in_reply_to: hasReplyTo ? replyToPost.id : null
    };
    await collections.posts.insertOne(postData);
    res.send(postData);
});

export default router;