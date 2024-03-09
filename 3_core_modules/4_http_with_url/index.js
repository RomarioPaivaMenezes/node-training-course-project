const http = require('http')
const url = require('url')

const port = 3000

const server = http.createServer((req, response) => {

    const urlInfo = url.parse(req.url, true)
    const name = urlInfo.query.name

    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html')

    if(!name){
        response.end(
            '<h1>No Name</p><form method="GET"><input type="text" name="name"/><input type="submit" value="Send"></form>'
            )
    }else{
        response.end(`<h1>Welcome, ${name}</p>`)
    }

    response.end('<h1>Hello, My first server with html.</h1><p>Testing application!</p>')
})

server.listen(port, () => {
    console.log(`server running in the port: ${port}`)
})