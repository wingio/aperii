var text = 'Hey @aperii you suck!\n:('

function tokenize(string) {
    var lines = string.split('\n')
    var tokens = []
    lines.forEach(line => {
        var toks = perline(line)
        //console.log(toks)
        //tokens = [...toks, {type: 3}]
        tokens.push(...toks, {type: 3})
    })
    tokens.pop()

    while(tokens.length > 0 && (tokens[0].value == '' || tokens[0].type == 3)){
        tokens.shift()
    }

    return tokens.length < 1 ? [{type: 0, value: ' '}] : tokens
}

function perline(string){
    var mentionReg = /^@[a-zA-Z0-9_]{3,32}$/g
    var tokens = []
    var nextToken = {}

    string.split(' ').forEach((segment, i) => {
        var mentions = segment.match(mentionReg)
        if (mentions) {
            nextToken.type = 1
            nextToken.value = mentions[0].slice(1).toLowerCase()
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

    return tokens
}

module.exports = tokenize


//console.log(tokenize(text))