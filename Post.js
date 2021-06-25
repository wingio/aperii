const constants = require('./constants')
const c = new constants()

var me = c.dgetFlagsFromBitfield(144)
var testobj = {hello: "world"}
console.log(Object.keys(testobj).length === 0)