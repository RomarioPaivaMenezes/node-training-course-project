const path = require('path')

const filePath = "test.txt"

//resolving absolute path
console.log(path.resolve(filePath))

const midFolder = "reports"
const newFile = "rjpm.txt"

//creating new path
const finalPath = path.join('/', 'test-files', midFolder, newFile)
console.log(finalPath)