const koa = require('koa');
const {initRouter,initController, initService, initConfig} = require('./zzb-loader');

class zzz {
    constructor (conf) {
        this.$app = new koa(conf);
        initConfig(this)
        this.$service = initService(this);
        this.$ctrl = initController(this);
        this.$router = initRouter(this);
        this.$app.use(this.$router.routes());
    }

    start(port){
        this.$app.listen(port, () => {
            console.log('ZZZ服务' + port);
            
        })
    }
}

module.exports = zzz;