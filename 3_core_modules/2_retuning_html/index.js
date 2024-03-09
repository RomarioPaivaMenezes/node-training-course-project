const http = require('http')

const port = 3000

const server = http.createServer((req, response) => {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html')

    response.end('<h1>Hello, My first server with html.</h1><p>Testing application!</p>')
})

server.listen(port, () => {
    console.log(`server running in the port: ${port}`)
})