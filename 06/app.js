const koa = require('koa');
const app = new koa();
const session = require('koa-session');

app.keys=['some sercret']
const redisStore = require('koa-redis');
const redis = require('redis');
const redisClient = redis.createClient(6379, 'localhost')

const wrapper = require('co-redis')
const client = wrapper(redisClient)

app.use(session({
    key:'kkb:sess',
    store:redisStore({client})
},app))

app.use(async (ctx,next) => {
    const keys = await client.keys('*')
    keys.forEach(async key => {
        console.log(await client.get(key));
        
    });
})

// 配置项
// const SESS_CONFIG = {
//     key: 'kkb:sess',
//     maxAge: 86400000,
//     httpOnly: true,
//     signed:true
// }

// app.use(session(SESS_CONFIG, app))

//测试
app.use(ctx => {
    if(ctx.path === '/favicon.ico') return 
    //获取
    let n = ctx.session.count || 0

    //设置
    ctx.session.count = ++n
    ctx.body = `第${n}此访问`
})

app.listen(3000, () => {
    console.log(333);
    
})