const constants = require('./constants')
const c = new constants()

var me = c.getFlagsFromBitfield(14)

console.log(me)