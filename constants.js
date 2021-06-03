function dec2bin(dec) {
    return (dec >> 1).toString(2);
}

class Constants {
    constructor(){
        this.VALID_USER_PROPS = [
            'avatar',
            'verified',
            'displayname',
            'username'
        ]

        this.FLAGS = {
            NONE: 0,
            VERIFIED: 1 << 1,
            STAFF: 1 << 2,
            ADMIN: 1 << 3,
            EARLY_SUPPORTER: 1 << 4
        }

        this.DISCORD_FLAGS = {
            NONE: 0,	//None
            STAFF: 1 << 0,	//Discord Employee
            PARTNER: 1 << 1,	//Partnered Server Owner
            HYPESQUAD_EVENTS: 1 << 2,	//HypeSquad Events
            BUG_HUNTER_1: 1 << 3,	//Bug Hunter Level 1
            BRAVERY: 1 << 6,	//House Bravery
            BRILLIANCE: 1 << 7,	//House Brilliance
            BALANCE: 1 << 8,	//House Balance
            SUPPORTER: 1 << 9,	//Early Supporter
            TEAM_USER: 1 << 10,	//Team User
            BUG_HUNTER_2: 1 << 14,	//Bug Hunter Level 2
            VERIFIED_BOT: 1 << 16,	//Verified Bot
            VERIFIED_BOT_DEV: 1 << 17,	//Early Verified Bot Developer
            CERTIFIED_MOD: 1 << 18	//Discord Certified Moderator
        }
    }

    getFlagsFromBitfield(int){
        var bin = dec2bin(int)
        var flagNames = []
        var flag;
        for(flag in this.FLAGS){
            if(flag != "NONE"){
                flagNames.push(flag)
            }
        }
        while(bin.length < flagNames.length){
            bin = 0 + bin
        }
        var vals = bin.split('')
        var result = {}
        vals.forEach((flag, i) => {
            var label = flagNames[(flagNames.length - 1 )- i]
            result[label.toLowerCase()] = (flag == '0') ? false : flag == '1' ? true : false
        })
    
        return result
    }

    dgetFlagsFromBitfield(int){
        var bin = dec2bin(int)
        var flagNames = []
        var flag;
        for(flag in this.DISCORD_FLAGS){
            if(flag != "NONE"){
                flagNames.push(flag)
            }
        }
        while(bin.length < flagNames.length){
            bin = 0 + bin
        }
        var vals = bin.split('')
        var result = {}
        vals.forEach((flag, i) => {
            var label = flagNames[(flagNames.length - 1 )- i]
            result[label.toLowerCase()] = (flag == '0') ? false : flag == '1' ? true : false
        })
    
        return result
    }
}

module.exports = Constants