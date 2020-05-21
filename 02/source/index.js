// const http = require('http');
//
// const server = http.createServer((req, res) => {
//     res.writeHead(200)
//     res.end('hi 小跩')
// })
//
// server.listen(3000)

const ZKOA = require('./zkoa');
const app = new ZKOA();

app.use(ctx => {
    ctx.body = 'new 520'
})

app.listen(3000, () => {
    console.log('3000')
})