export default class User {
    constructor(
        public id: string, 
        public joinedTimestamp: number, 
        public displayName: string, 
        public username: string, 
        public flags: number, 
        public suspended: boolean, 
        public bio: string, 
        public banner: string, 
        public avatar: string
    ) {}
}