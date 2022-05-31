import { Router } from "express";
import { getPost } from "../../../handlers/Posts";
import { getUserByUsername } from "../../../handlers/Users";
import User from "../../../models/user/User";
import { sendError } from "../../../utils/Utils";

const router = Router()

let SITE_BASE_URL = "https://aperii.com/";
let CDN_BASE_URL = "https://api.aperii.com/cdn";

let POST_LINK_REGEX = /^@[A-z0-9_]+\/p\/([0-9]+)\/?$/gi
let USER_LINK_REGEX = /^@[A-z0-9_]+\/?$/gi

router.get("/", async (req, res) => {
    let { url } = req.query;

    if (!url) {
        sendError(res, 400, "Missing required fields");
        return;
    }

    let urlToParse = url.toString().replace(SITE_BASE_URL, "");

    if (urlToParse.match(POST_LINK_REGEX)) {
        let postId = urlToParse.split("/")[2];
        let post = await getPost(postId);
        if(!post) return sendError(res, 404, "Post not found");
        let author = post.author as User;
        return res.json({
            type: "link",
            version: "1.0",
            provider_name: "Aperii",
            provider_url: SITE_BASE_URL,
            author_name: `${author.displayName} (@${author.username})`,
            author_url: `${SITE_BASE_URL}@${author.username}`,
            cache_age: "86400",
            author_icon_url: author.avatar.length > 0 ? `${CDN_BASE_URL}/avatars/${author.avatar}` : `${SITE_BASE_URL}av.png`,
            description: post.body,
            url: SITE_BASE_URL + `@${author.username}/p/${post.id}`,
        });
    }

    if(urlToParse.match(USER_LINK_REGEX)) {
        let username = urlToParse.split("/")[0].replace("@", "");
        let user = await getUserByUsername(username);
        if(!user) return sendError(res, 404, "User not found");
        return res.json({
            type: "link",
            version: "1.0",
            provider_name: "Aperii",
            provider_url: SITE_BASE_URL,
            author_name: `${user.displayName} (@${user.username})`,
            author_url: `${SITE_BASE_URL}@${user.username}`,
            cache_age: "86400",
            thumbnail_url: user.avatar.length > 0 ? `${CDN_BASE_URL}/avatars/${user.avatar}` : `${SITE_BASE_URL}av.png`,
            description: user.bio,
            url: SITE_BASE_URL + `@${user.username}`,
        });
    }

    return sendError(res, 404, "Not found");

})

export default router;