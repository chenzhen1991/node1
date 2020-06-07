const {EventEmitter} = require('events')
const event = new EventEmitter()

event.on('cnn', num => {
    console.log('some event 触发' + num);
})

let num = 0;
setInterval(() => {
    event.emit('cnn', num ++)
}, 1000);