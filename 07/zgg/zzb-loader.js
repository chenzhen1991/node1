const fs = require("fs");
const path = require("path");
const Router = require("koa-router");

//读取文件
function load(dir, cb) {
    // 获取绝对路径
    const url = path.resolve(__dirname, dir);
    // 读取路径下的文件
    const files = fs.readdirSync(url);
    // 遍历路由文件，将路由配置解析到路由器中
    files.forEach(filename => {
        // 去掉后缀名
        filename = filename.replace(".js", "");
        // 导入文件
        const file = require(url + "/" + filename);
        // 处理逻辑
        cb(filename, file);
    });
}

function initRouter(app) {
    //实例化router
    const router = new Router();
    load('router', (filename, routes) => {
        routes = typeof routes === 'function' ? routes(app) : routes
        // index去除前缀 / /user
        const prefix = filename === 'index' ? '' : `/${filename}`

        //遍历路由
        Object.keys(routes).forEach(key => {
            const [method, path] = key.split(' ')
            console.log(`正在映射注册地址：${method.toLocaleUpperCase()} ${prefix + path}`);
            // router['get']
            //console.log(prefix + path, routes[key]);

            // router[method](prefix + path, routes[key]);
            router[method](prefix + path, async ctx => {
                app.ctx = ctx
                await routes[key](app)
            });
        })
    })

    return router
}

function initController(app) {
    const controllers = {};
    //读取
    load('controller', (filename, controller) => {
        controllers[filename] = controller(app)
    })

    return controllers
}

function initService(app) {
    const services = {};
    load('service', (filename, service) => {
        services[filename] = service(app)
    });
    return services;
}


const Sequelize = require('sequelize')
function initConfig(app) {
    // 加载数据库
    load('config', (filename, conf) => {
        if (conf.db) {
            app.$db = new Sequelize(conf.db)

            // 加载模型
            app.$model = {};
            load("model", (filename, { schema, options }) => {
                app.$model[filename] = app.$db.define(filename, schema,
                    options);
            });
            app.$db.sync();
        }
    })
}

module.exports = { initRouter, initController, initService, initConfig };