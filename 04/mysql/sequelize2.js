//  字段带有验证
(async () => {
    const Sequelize = require('sequelize');

    // 建立连接
    const sequelize = new Sequelize('test', 'root','130609zzr',{
        host: "localhost",
        dialect: "mysql",
        operatorsAliases: false
    });

    // 定义模型
    const Fruit = sequelize.define('fruit',{
        name:{
            type:Sequelize.STRING(20),
            allowNull: false,
            get(){
                const fname = this.getDataValue('name');
                const price = this.getDataValue('price');
                const stock = this.getDataValue('stock');
                return `${fname}(价格:￥${price}库存：${stock}Kg)`
            }
        },
        price: {
            type:Sequelize.FLOAT,
            allowNull: false,
            validate:{
                isFloat: {msg:'价格字段请输入数字'},
                min:{args: [0], msg:'价格字段必须大于0'}
            }
        },
        stock:{
            type:Sequelize.INTEGER,
            defaultValue:0
        }
    },{
        timestamp:false,
        getterMethods:{
            amount(){
                return this.getDataValue('stock') + 'KG'
            }
        },
        setterMethods:{
            amount(val) {
                const idx = val.indexOf('Kg');
                const v = val.slice(0, idx);
                this.setDataValue('stock', v)
            }
        }
    })

    Fruit.classify = function (name) {
        const tropicFruits = ['香蕉', '芒果', '椰子'];
        return tropicFruits.includes(name) ? '热带水果' : '其他水果';
    }
    Fruit.prototype.totalPrice = function (count) {
        return (this.price * count).toFixed(2)
    }
    const fruitArr = ['苹果', '芒果', '椰子'];

    fruitArr.forEach(f => console.log(f + '是' + Fruit.classify(f)));

    //同步数据库,force:true则会删除已存在表
    let ret = await Fruit.sync({force: false});
    // console.log('ret' , ret)
    ret = await Fruit.create({
        name: '香蕉',
        price: 5
    })
    // console.log('ret' ,ret)

    ret = await Fruit.findAll()
    // console.log('ret' ,ret)

    // 使用实例方法
    Fruit.findAll().then(fruits => {
        const [f1] = fruits;
        console.log(`买5kg${f1.name}需要￥${f1.totalPrice(5)}`);
    })
})()
