const Koa  = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    const start = Date.now();
    await next()
    const end = Date.now();
    console.log(`请求的耗时时间为${parseInt(end-start)}msls`)
})

app.use((ctx, next) => {
    const expire = Date.now() + 102
    while(Date.now() < expire)
    ctx.body = [
        {
            name: 'Tom'
        }
    ]
})

app.listen(3000)