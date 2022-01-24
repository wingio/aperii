import MeUser from "../models/user/MeUser";
import User from "../models/user/User";
import { collections } from "../services/database.service";

export async function getUser(id: string, isMe: boolean = false, username?: string ) : Promise<User>{
    let doc = await collections.users.findOne({id});
    if(!doc) return null;
    if(isMe) return new MeUser(doc.id, doc.joinedTimestamp, doc.email, doc.verifiedEmail, doc.displayName, doc.username, doc.flags, doc.suspended, doc.bio, doc.banner, doc.avatar);
    return new User(doc.id, doc.joinedTimestamp, doc.displayName, doc.username, doc.flags, doc.suspended, doc.bio, doc.banner, doc.avatar);
}

export async function getUserByUsername(username: string) : Promise<User>{
    let doc = await collections.users.findOne({username: username.toLowerCase()});
    if(!doc) return null;
    return new User(doc.id, doc.joinedTimestamp, doc.displayName, doc.username, doc.flags, doc.suspended, doc.bio, doc.banner, doc.avatar);
}