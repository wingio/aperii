import { Request, Response, Router } from "express";
import axios from "axios";
import { getUser } from "../../../../handlers/Users";
import { collections } from "../../../../services/database.service";
import { sendError } from "../../../../utils/Utils";
import Config from "../../../../Config";

type Avatar = {
    id: string,
    image: ArrayBuffer,
    format: string
    lastRetrieved: number
}

const router = Router();

const avatarCache = new Map<string, Avatar>();
const cacheTimeout = 1000 * 60 * 60 * 24;

router.get("/", async (req: Request, res: Response) => {
    const { id } = req.parameters;
    var u = await getUser(id);
    if(!u) {
        sendError(res, 404, "User not found");
        return;
    }
    var avData = await collections.cdn.findOne({id: u.id, type: 0});
    if(!avData) {
        sendError(res, 404, "Avatar not found");
        return;
    }
    if(avatarCache.has(avData.image_id)) {
        var av = avatarCache.get(avData.image_id);
        if(Date.now() - av.lastRetrieved < cacheTimeout) {
            avatarCache.set(avData.image_id, {
                ...av,
                lastRetrieved: Date.now()
            });
            res.setHeader("Content-Type", av.format);
            res.send(av.image);
            return;
        } else {
            avatarCache.delete(avData.image_id);
        }
    }
    var image = await axios.get(`https://imagedelivery.net/${Config.CF_IMAGE_DELIVERY}/${avData.image_id}/public`, {responseType: "arraybuffer"});
    avatarCache.set(avData.image_id, {
        id: avData.image_id,
        image: image.data,
        format: image.headers["content-type"],
        lastRetrieved: Date.now()
    });
    res.setHeader("Content-Type", image.headers["content-type"]);
    res.send(image.data);
});

export default router;