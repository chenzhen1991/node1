// const add = (x, y) => x + y
// const square = z => z * z
//
// //扩展
// // const compose = (fn1, fn2) => (...args) => fn2(fn1(...args))
// const compose = (...[first, ...other]) => (...args) => {
//     let ret = first(...args);
//     other.forEach(fn => {
//         ret = fn(ret)
//     })
//
//     return ret
// }
//
// const fn = compose(add, square, square)
//
// // const fn = (x, y) => square(add(x, y))
//
// console.log(fn(2,3))

async function fn1(next) {
    console.log('fn1');
    await next()
    console.log('end fn1')
}

async function fn2(next) {
    console.log('fn2')
    await delay();
    await next();
    console.log('end fn2')
}

function fn3(next) {
    console.log('fn3')
}


function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        },2000)
    })
}

const middlewares = [fn1, fn2, fn3]
const finaFn = compose(middlewares)
finaFn()