(async () => {
    const Sequelize = require('sequelize');

    // 建立连接
    const sequelize = new Sequelize('test', 'root', '130609zzr', {
        host:'localhost',
        dialect:'mysql',
        operatorsAliases: false //仍可通过传入 operators map至operatorsAliases 的方式来使用字符串运算符，但会返回启用警告
    })

    // 定义模型
    const Fruit = sequelize.define('Fruit', {
        name: {type :Sequelize.STRING(20), allowNull:false},
        price: {type:Sequelize.FLOAT,allowNull:false},
        stock: {type:Sequelize.INTEGER,defaultValue:0}
    });

    //同步数据库，force:true则会删除已存在表
    let ret = await Fruit.sync({force: true})
    console.log('sync', ret);

    ret = await Fruit.create({
        name:'香蕉',
        price:3.4
    })

    console.log('create', ret);
    ret = await Fruit.findAll()
    await Fruit.update(
        {price:4.5},
        {where: {name :'香蕉'}}
    )
    console.log('findAll', JSON.stringify(ret));
    
    const Op = Sequelize.Op;
    ret = await Fruit.findAll({
        where: {price: {[Op.lt]: 5, [Op.gt]:2}}
    })

    console.log('findAll', JSON.stringify(ret, '', '\t'));
})()