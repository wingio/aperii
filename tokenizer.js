var text = 'Hey @aperii, you suck'

function tokenize(string) {
    var mentionReg = /@[a-z0-9_]{4,32}/g
    var tokens = []
    var nextToken = {}
    string.split(' ').forEach(segment => {
        var mentions = segment.match(mentionReg)
        if (mentions) {
            nextToken.type = 1
            nextToken.value = mentions[0].slice(1)
            tokens.push(nextToken)
            nextToken = {}
            nextToken.type = 0
            nextToken.value = segment.replaceAll(mentions[0], '')
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
            arr[currIndex] = {
                type: curr.type,
                value: last.value + ' ' + curr.value
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


console.log(tokenize(text))