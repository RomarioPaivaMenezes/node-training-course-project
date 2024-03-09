const fs = require("fs")

console.log("init")

fs.writeFileSync("file.txt", "Hello")

console.log("end")