const http = require('http')
const fs = require('fs')

const port = 3000

const server = http.createServer((request, response) => {
    fs.readFile('message.html', function(err, data) {
        response.writeHead(200, {'Content-Type':'text/html'})
        response.write(data)
        return response.end()
    })
})

server.listen(port, () => {
    console.log(`server running in the port: ${port}`)
})