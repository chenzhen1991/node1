const http = require('http');
const fs = require('fs');

http
    .createServer((req,res) => {
        const { method, url} = req;
        // console.log('method,url',method ,url)
        //观察cookie
        // console.log('cookie', req.headers.cookie)
        if(method == 'GET' && url == '/') {
            fs.readFile('./index.html', (err, data) => {
                res.setHeader('Content-Type', 'text/html');
                res.end(data)
            })
        } else if(method == 'GET' && url == '/api/users'){
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.setHeader('set-Cookie','cookie1=va222')
            res.end(JSON.stringify([{name: 'Tom', age: 20}]))
        }
        // else if(method == 'OPTIONS' && url == '/api/users'){
        //     res.writeHead(200, {
        //         'Access-Control-Allow-Credentials': true,
        //         'Access-Control-Allow-Origin': 'http://localhost:3000',
        //         'Access-Control-Allow-Headers': 'X-Token, Content-Type',
        //         'Access-Control-Allow-Methods': 'PUT'
        //     })
        //     res.end()
        // }
        else if(method === 'POST' && url==='/api/save'){
            console.log('diao')
            let reqData = [];
            let size = 0;
            req.on('data', data => {
                console.log('req on' , data)
                reqData.push(data);
                size += data.length
            })
            req.on('end', function(){
                console.log('end')
                const data = Buffer.concat(reqData, size);
                console.log('data', size, data.toString())
                res.end(`formdata:${data.toString()}`)
            })
        }
    })
.listen(4000, () => {
    console.log('4000端口被监听')
})
