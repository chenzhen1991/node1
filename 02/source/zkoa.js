const http = require('http');
const request = require('./request');
const response = require('./response');
const context = require('./context');

class ZKOA{
    constructor(){
        this.middlewares = []
    }
    listen(...args) {
        const server = http.createServer(async (req, res) => {
            // 创建上下文
            const ctx = this.createContext(req, res)
            // this.callback(req,res)
            // this.callback(ctx)
            //中间合成
            const fn = this.compose(this.middlewares);
            await fn(ctx)
            // 响应
            res.end(ctx.body)
        })
        server.listen(...args)
    }
    use (middleware) {
        this.middlewares.push(middleware)
    }

    // 合成函数
    compose(middlewares){
        return function (ctx) {
            return dispatch(0);
            function dispatch(i) {
                let fn = middlewares[i]
                if(!fn){
                    return Promise.resolve()
                }

                return Promise.resolve(
                    fn(ctx, function next() {
                        return dispatch(i + 1)
                    })
                )
            }
        }
    }

    createContext (req, res) {
        const ctx = Object.create(context);
        ctx.request = Object.create(request);
        ctx.response = Object.create(response);

        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;

        return ctx;
    }
}

module.exports = ZKOA
