import { Request, Response, Router } from "express";
import axios from "axios";
import { getUser } from "../../../../handlers/Users";
import { collections } from "../../../../services/database.service";
import { sendError } from "../../../../utils/Utils";
import Config from "../../../../Config";

const router = Router();

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
    var image = await axios.get(`https://imagedelivery.net/${Config.CF_IMAGE_DELIVERY}/${avData.image_id}/public`, {responseType: "arraybuffer"});
    res.setHeader("Content-Type", image.headers["content-type"]);
    res.send(image.data);
});

export default router;