var example = "Hey @wing, you suck\ngo away"
//console.log(example.split(''))
function tokenizer(input) {
    input.replace('\\n', '\n')
    var chars = input.split('')
    let tokens = []
    var blank = {
        type: 0,
        value: ""
    }
    
    var isMention = false
    var lastMention = undefined
    chars.forEach((char, i) => {
        var lastTok = tokens.length < 1 ? blank : tokens.pop()
        var newTok = {
            type: 0,
            value: ""
        }
        var mentionRegex = /^[@a-zA-Z_0-9]$/
        isMention = (char == "@" && chars[i + 1] != "@") || lastMention != undefined
        isLinebreak = (char == "\n" && chars[i + 1] != "\n")
        if(isMention && mentionRegex.test(char)){
            lastMention = i
            newTok.type = 1

            if(lastTok.type == newTok.type){
                lastTok.type = 1
                lastTok.value += char
            } else {
                newTok.type = 1
                newTok.value += char
            }
            
        } else if(isLinebreak) {
            lastMention = undefined
            newTok.type = 3

            if(lastTok.type == newTok.type){
                lastTok.type = 3
                lastTok.value += char
            } else {
                newTok.type = 3
                newTok.value += char
            }
        } else {
            lastMention = undefined
            newTok.type = 0

            if(lastTok.type == newTok.type){
                lastTok.type = 0
                lastTok.value += char
            } else {
                newTok.type = 0
                newTok.value += char
            }
        }

        tokens.push(lastTok)
        if(newTok.type != lastTok.type) tokens.push(newTok) 
    });

    return tokens
}

module.exports = tokenizer
//console.log(tokenizer(example))