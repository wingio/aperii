var count = 0

function idgen(type) {
    var now = (Date.now() - 1617681600000).toString(2)
    while(now.length < 42){
        now = '0' + now
    }

    var types = {
        user: 1,
        post: 2,
        noti: 3,
        app: 4
    }
    var typeint = types[type].toString(2)
    while(typeint.length < 5){
        typeint = '0' + typeint
    }

    count = count > 131071 ? 0 : count
    var cnt = count.toString(2)
    while(cnt.length < 17){
        cnt = '0' + cnt
    }

    count += 1
    return parseInt(now + typeint + cnt, 2).toString()
}

module.exports = idgen
