const fs = require('fs')

const fileOldname = 'file.txt'
const fileNewName = 'fileNewName.txt'

fs.rename(fileOldname, fileNewName, function(err){
    if(err){
        console.log(err)
        return
    }
    console.log(`File ${fileOldname} has been renamed to ${fileNewName}`)
})