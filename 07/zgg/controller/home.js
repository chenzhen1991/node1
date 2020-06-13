// module.exports = {
//     index: async ctx => {
//         ctx.body = '首页CTX'
//     },
//     detail: ctx => {
//         ctx.body = '详细页面CTRL'
//     }
// }

module.exports = app => ({
    index: async ctx => {
        // const name = await app.$service.user.getName();
        // app.ctx.body = 'ctrl user' + name
        app.ctx.body = await app.$model.user.findAll()
    },
    detail: ctx => {
        ctx.body = 'Ctrl DETAIL'
    }
})