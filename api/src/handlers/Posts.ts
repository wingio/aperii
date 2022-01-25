import Post from "../models/post/Post";
import { collections } from "../services/database.service";
import { getUser } from "./Users";

export async function getPost(id: string): Promise<Post> {
    let post = await collections.posts.findOne({id});
    if(!post) return null;
    let modelPost = new Post(post.id, post.createdTimestamp, post.author, post.body, post.in_reply_to, []);
    let postAuthor = await getUser(modelPost.author as string);
    if(postAuthor) modelPost.author = postAuthor;
    let replyTo = await getPost(modelPost.in_reply_to as string);
    if(replyTo) modelPost.in_reply_to = replyTo;
    if(modelPost.in_reply_to == null) delete modelPost.in_reply_to;
    return modelPost;
}