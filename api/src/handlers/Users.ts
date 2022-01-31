import MeUser from "../models/user/MeUser";
import User from "../models/user/User";
import UserFlags from "../models/user/UserFlags";
import { collections } from "../services/database.service";

export async function getUser(id: string, isMe: boolean = false, username?: string ) : Promise<User>{
    let doc = await collections.users.findOne({id});
    if(!doc) return null;
    let av = await collections.cdn.findOne({id, type: 0});
    if(av) doc.avatar = av.id;
    if(isMe) return new MeUser(doc.id, doc.joinedTimestamp, doc.email, doc.verifiedEmail, doc.displayName, doc.username, new UserFlags(doc.flags), doc.suspended, doc.bio, doc.banner, doc.avatar, doc.pronouns || "");
    return new User(doc.id, doc.joinedTimestamp, doc.displayName, doc.username, new UserFlags(doc.flags), doc.suspended, doc.bio, doc.banner, doc.avatar, doc.pronouns || "");
}

export async function getUserByUsername(username: string) : Promise<User>{
    let doc = await collections.users.findOne({username: username.toLowerCase()});
    if(!doc) return null;
    let av = await collections.cdn.findOne({id: doc.id, type: 0});
    if(av) doc.avatar = av.id;
    return new User(doc.id, doc.joinedTimestamp, doc.displayName, doc.username, new UserFlags(doc.flags), doc.suspended, doc.bio, doc.banner, doc.avatar, doc.pronouns || "");
}