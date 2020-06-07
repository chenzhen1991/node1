const Koa = require('koa');
const router = require('koa-router');
const session = require('koa-session');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const app = new Koa()

// 配置session的中间件
//处理跨域
app.use(cors({
    credentials: true
}))

app.keys = ['some secret'];

app.use(static(__dirname+'/'));
app.use(bodyParser());
app.use(session(app))

app.use((ctx,next) => {
    // 鉴权
    if(ctx.url.indexOf('login') > -1){
        next()
    }else{
        console.log('未登录');
        if(!ctx.session.userinfo){
            ctx.body = {
                message: '未登录'
            }
        } else {
            next()
        }
    }
})

router.post('/users/login', async ctx => {
    // 验证登录信息
    // 赋权
    ctx.session.userinfo = body.username
})