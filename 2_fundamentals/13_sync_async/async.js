const fs = require("fs")

console.log("init")

fs.writeFile("file.txt", "Hello", function(err){
    setTimeout(function() {
        console.log("File has been created")
    }, 1000)
})

console.log("end")