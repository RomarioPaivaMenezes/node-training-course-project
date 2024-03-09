const http = require('http')

const port = 3000

const server = http.createServer((req, response) => {

    response.write('Hello')
    response.end()
})

server.listen(port, () => {
    console.log(`server running in the port: ${port}`)
})