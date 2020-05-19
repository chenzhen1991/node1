// const  http = require('http');
// const server = http.createServer((req,res) =>{
//     res.writeHead(200)
//     res.end('hi kaikeba')
// })
//
// server.listen(3000, () => {
//
// })

const ZKOA = require('./zkoa');
console.log(ZKOA)
const app = new ZKOA();

app.use((req,res) => {
    res.writeHead(200)
    res.end('zzr  zzr')
})

app.listen(3000, () => {
    console.log(333)
})
