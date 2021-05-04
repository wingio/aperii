var text = 'Hey @aperii, you suck'

function tokenize(string) {
    var mentionReg = /@[a-z0-9_]{4,32}/g
    var tokens = []
    var nextToken = {}
    string.split(' ').forEach((segment, i) => {
        var mentions = segment.match(mentionReg)
        if (mentions) {
            nextToken.type = 1
            nextToken.value = mentions[0].slice(1)
            tokens.push(nextToken)
            nextToken = {}
            nextToken.type = 0
            nextToken.value = segment.replace(mentions[0], '')
        } else {
            nextToken.type = 0
            nextToken.value = segment
        }

        tokens.push(nextToken)
        nextToken = {}
    });

    tokens.reduce((prev, curr, currIndex, arr) => {
        var last = arr[currIndex - 1] ? arr[currIndex - 1] : undefined
        if (last && (last.type == curr.type)) {
            var newvalue = last.value + ' ' + curr.value
            if(!newvalue.startsWith(',')){
                newvalue += ' '
            }
            arr[currIndex] = {
                type: curr.type,
                value: newvalue
            }
            arr[currIndex - 1] = undefined
        }
        return arr
    })
    while (tokens.includes(undefined)) {
        tokens.forEach((tok, i) => {
            if (typeof tok == 'undefined') {
                tokens.splice(i, 1)
            }
        })
    }

    tokens.forEach((tok, i) => {
        if(tok.type == 0){
            tok.value += ' '
        }
    })

    return tokens
}

module.exports = tokenize


console.log(tokenize(text))