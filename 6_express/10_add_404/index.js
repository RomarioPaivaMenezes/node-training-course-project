const express = require ('express')
const app = express()
const port = 8080
const path = require("path")

const users = require('./users')


const checkAuth = function(request, response, next){
    
    request.authStatus = true
    
    if(request.authStatus){
        console.log("logged In!")
        next()
    }else {
        console.log("Is not logged!")
        next()
    }
}

const basePath = path.join(__dirname, 'templates')

app.use(express.urlencoded({
    extended: true,
}))

app.use(express.json())

app.use(express.static('public'))

app.use(checkAuth)

app.use('/users', users)

app.get('/', (request, reponse) => {
    reponse.sendFile(`${basePath}/index.html`)    
});

app.use(function(req, res, next) {
    res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port, () => {
    console.log(`Running in port: ${port}`)
})