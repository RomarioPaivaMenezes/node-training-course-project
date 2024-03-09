const minimist = require("minimist")
const sum = require('./sum').sum

// external module
const args = minimist(process.argv.slice(2))

const a = parseInt(args["a"])
const b = parseInt(args["b"])
// internal module
sum(a , b)

