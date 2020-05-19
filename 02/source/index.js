const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200)
    res.end('hi 小跩')
})

server.listen(3000)