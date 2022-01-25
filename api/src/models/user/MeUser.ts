import User from "./User";
import UserFlags from "./UserFlags";

export default class MeUser extends User {
    constructor(
        public id: string, 
        public joinedTimestamp: number, 
        public email: string,
        public verifiedEmail: boolean,
        public displayName: string, 
        public username: string, 
        public flags: UserFlags, 
        public suspended: boolean, 
        public bio: string, 
        public banner: string, 
        public avatar: string
    ) {
        super(id, joinedTimestamp, displayName, username, flags, suspended, bio, banner, avatar);
    }
}