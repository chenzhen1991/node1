const http = require('http');
const session = {}

http.createServer((req,res) => {
    if(req.url === './favicon.ico'){
        res.end('')
        return
    }

    // 观察cookie 
    // console.log('cookie', req.headers.cookie);
    

    // 设置cookie
    // res.setHeader('Set-Cookie', 'cookie1=abc');
    // res.end('hello cookie')

    const sessionKey = 'sid';
    const cookie = req.headers.cookie

    if(cookie && cookie.indexOf('sessionKey') > -1){
        // 登录态存在
        res.end('Come back')
        const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
        const sid = pattern.exec(cookie)[1]
        console.log('session', session, session[sid]);
        
    }else{
        // 首次访问
        const sid = (Math.random() * 99999999).toFixed()
        // 设置cookie
        res.setHeader('Set-Cookie', `${sessionKey}=${sid}`)
        session[sid] = {name: 'laowang'}
        res.end('Hello')
    }
})
.listen(3000)