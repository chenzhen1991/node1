const express = require('express');
const app = express()
app.use(express.static(__dirname + '/'))
const {createProxyMiddleware} = require('http-proxy-middleware')
app.use('/api', createProxyMiddleware({
    target: 'http://localhost:4000', changeOrigin: false
}));
app.listen(3000, () => {
    console.log('3000端口')
})
