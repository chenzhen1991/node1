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

// app.use(ctx => {
//     ctx.body = 'new 520'
// })

// const delay = () => new Promise(resolve => setTimeout(() => resolve(),2000))
//
// app.use(async (ctx, next) => {
//     ctx.body='1';
//     await next();
//     ctx.body += '5'
// })
//
// app.use(async (ctx, next) => {
//     ctx.body += '2';
//     await delay()
//     await next()
//     ctx.body += '4'
// })
//
// app.use(async (ctx, next) => {
//     ctx.body += '3'
// })
// const Router = require('./router')
// const router = new Router();
//
// const static = require('./static')
// app.use(static(__dirname + '/public'));
//
// router.get('/index',async ctx => {
//     console.log('index.xxx')
//     ctx.body = 'index page'
// })
//
// router.get('/post', async ctx => {ctx.body = 'post body'})
// router.get('/list',async ctx => {ctx.body = 'list page'})
//
// router.post('/index',async ctx => {ctx.body = 'post body'})
//
// //路由实例输出父中间件 router.routes()
// app.use(router.routes())
//
// app.listen(3000, () => {
//     console.log('3000')
// })

app.use(require("./iptable"));
app.listen(3000, '0.0.0.0', () => {
    console.log("监听端口3000");
});