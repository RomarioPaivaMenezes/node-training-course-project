const express = require ('express')
const app = express()
const port = 8080

const path = require("path")
const basePath = path.join(__dirname, 'templates')

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

app.use(checkAuth)


app.get('/', (request, reponse) => {
    
    reponse.sendFile(`${basePath}/index.html`)

});

app.listen(port, () => {
    console.log(`Running in port: ${port}`)
})