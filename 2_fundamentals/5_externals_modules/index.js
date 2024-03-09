const minimist = require("minimist")

const args = minimist(process.argv.slice(2))

const name = args["name"]
const surname = args["surname"]
console.log(`He name is ${name} ${surname}`)
