(async () => {
    const {MongoClient} = require('mongodb');

    //创建客户端
    const client = new MongoClient(
        'mongodb://localhost:27017',
        {
            userNewUrlParser: true
        }
    )

    let ret
    // 创建连接
    ret = await client.connect()
    console.log('connect: ', ret);
    const db = client.db('test')

    const fruits = db.collection('fruits')

    // 添加文档
    ret = await fruits.insertOne({
        name:'芒果',
        price:9.99
    })
    
    console.log('插入成功', JSON.stringify(ret))

    ret = await fruits.findOne()
    console.log('查询文档:', ret)

    ret = await fruits.updateOne({name:'芒果'},{
        $set:{name:'苹果'}
    })
    console.log('更新:', JSON.stringify(ret.result))

    ret = await fruits.deleteOne({name:'苹果'})

    await fruits.deleteMany()


    client.close()
})()