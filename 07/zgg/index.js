// const app = new(require('koa'))();
// const {initRouter} = require('./zzb-loader');
// app.use(initRouter().routes())

// app.listen(3000, () => {
//     console.log(2345);
// })

const zzz = require("./zzz");
const app = new zzz();
app.start(3000);