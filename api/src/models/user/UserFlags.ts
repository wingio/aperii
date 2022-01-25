export default class UserFlags {

    public verified: boolean = false;
    public staff: boolean = false;
    public admin: boolean = false;
    public early_supporter: boolean = false;

    constructor(flags?: number){
        if(flags) this.setFlags(flags);
    }

    static FLAGS = {
        NONE: 0,
        VERIFIED: 1 << 1,
        STAFF: 1 << 2,
        ADMIN: 1 << 3,
        EARLY_SUPPORTER: 1 << 4
    }

    getFlags(){
        let flags = 0;
        if(this.verified) flags |= UserFlags.FLAGS.VERIFIED;
        if(this.staff) flags |= UserFlags.FLAGS.STAFF;
        if(this.admin) flags |= UserFlags.FLAGS.ADMIN;
        if(this.early_supporter) flags |= UserFlags.FLAGS.EARLY_SUPPORTER;
        return flags;
    }

    setFlags(flags: number){
        this.verified = (flags & UserFlags.FLAGS.VERIFIED) !== 0;
        this.staff = (flags & UserFlags.FLAGS.STAFF) !== 0;
        this.admin = (flags & UserFlags.FLAGS.ADMIN) !== 0;
        this.early_supporter = (flags & UserFlags.FLAGS.EARLY_SUPPORTER) !== 0;
    }

    addFlag(flag: string|number){
        var flagInt = typeof flag != "number" ? UserFlags.FLAGS[flag] : flag;
        this.setFlags(this.getFlags() | flagInt)
    }

    removeFlag(flag: string|number){
        var flagInt = typeof flag != "number" ? UserFlags.FLAGS[flag] : flag;
        this.setFlags(this.getFlags() & ~flagInt)
    }

    static getFlagsFromBitfield(int: number){
        let flags = new UserFlags();
        flags.setFlags(int);
        return flags;
    }
}