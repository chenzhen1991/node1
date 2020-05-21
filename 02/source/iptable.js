// 请求拦截 黑名单中存在的ip访问将被拒绝

module.exports = async function (ctx, next) {
    const {res, req} = ctx;
    const blackList = ['127.0.0.1'];
    const ip = getClientIp(req);

    if(blackList.includes(ip)) { // 出现在黑名单中将被拒绝
        ctx.body = 'not allow'
    } else {
        await next()
    }
}

function getClientIp(req) {
  return (
      // 判断是否有反向代理Ip  --1
      // 判断connection 的远程ip --2
      // 判断后端的socket的ip --3
      req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress
  )
}