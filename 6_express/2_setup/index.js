const express = require ('express')
const app = express()
const port = 3000


app.get('/', (request, reponse) => {
    
    reponse.send('Hello World')

});

app.listen(port, () => {
    console.log(`Running in port: ${port}`)
})