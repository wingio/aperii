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
            EARLY_SUPPORTER: 1 << 3
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
}

module.exports = Constants