const conf = require('./config.js')

const {EventEmitter} = require('events')

// 客户端
const {MongoClient} = require('mongodb')

class Mongodb {
    constructor(conf){
        // 保存conf
        this.conf = conf
        this.emitter = new EventEmitter()
        // 连接
        this.client = new MongoClient(conf.url, {useNewUrlParser: true})
        this.client.connect(err => {
            if(err) throw err
            console.log('连接成功');
            this.emitter.emit('connect')
            
        })
    }

    // 返回对应的集合
    col(colName, dbName= conf.dbName){
        return this.client.db(dbName).collection(colName)
    }

    // 订阅数据库连接通知
    once(event, cb) {
        this.emitter.once(event, cb)
    }
}
module.exports = new Mongodb(conf)