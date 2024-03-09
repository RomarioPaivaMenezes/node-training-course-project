const EventEmitter = require('events')

const eventEmitter = new EventEmitter();

eventEmitter.on('start', () =>{
    console.log('during...')
})

console.log('before')

eventEmitter.emit('start')

console.log('after')


