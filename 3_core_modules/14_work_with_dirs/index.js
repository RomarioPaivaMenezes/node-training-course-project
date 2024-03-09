const fs = require('fs')

if(! fs.existsSync('./myFolder')){
    console.log('Folder not found!')
    fs.mkdirSync('./myFolder')
}


if(fs.existsSync('./myFolder')){
    console.log('Folder has been found!')
}