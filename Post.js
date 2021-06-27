// const mutantData = require('./public/resc/mutant.json')
// const fs = require('fs')
// const path = require('path')
// const emojiUnicode = require('emoji-unicode')
// const emojiRegex = require('./eregex')()
// var demoMessage = "This is to test emojis!!! 😁 🏳‍🌈"

// async function main() {
//     const emoji = await fs.readFileSync(path.join(__dirname, '/public/emoji/emoji', mutantData[0].src), {encoding: "utf-8"})
//     console.log(emoji)
// }

// function encodeEmoji(emoji) {
//     var comp;
//     if(emoji.length === 1){
//         return comp = emoji.charCodeAt(0)
//     }
//     comp = (emoji.charCodeAt(0) - 0xD800) + (emoji.charCodeAt(1) - 0xDC00)
//     if(comp < 0){
//         comp = emoji.charCodeAt(0)
//     }
//     return comp
// }

// /**
//  * 
//  * @param {String} text
//  */
// function parse(text){
//     var chars = text.match(emojiRegex)
//     var ret = []
//     chars.forEach(char => {
//         var charcode = parseInt(emojiUnicode(char), 16)
//         var f = mutantData.filter(md => md.code[0] == charcode)
//         if(f.length > 0){
//             ret.push(f[0])
//         } else {
//             ret.push(char)
//         }
//     });
//     return ret
// }

// var code = parseInt(emojiUnicode("😀"), 16)
// var emoji = mutantData.filter(md => md.code.includes(code))
// console.log(parse(demoMessage))