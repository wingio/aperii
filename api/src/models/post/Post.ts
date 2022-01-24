import User from "../user/User";

export default class Post {
    constructor(
        public id: string,
        public createdTimestamp: number,
        public author: string | User,
        public body: string,
        public in_reply_to: string | Post,
        public media: string[]
    ) {}
}