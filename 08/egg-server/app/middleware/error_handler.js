/* eslint-disable no-unused-vars */
'use strict';
/*
*增加异常处理中间件
*异常统⼀处理
*开发环境返回详细异常信息
*⽣产环境不返回详细信息
*/
module.exports = (option, app) => {
  return async function(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发⼀个 error 事件，框架会记录⼀条错误⽇志
      app.emit('error', err, this);
      const status = err.status || 500;
      // ⽣产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && app.config.env === 'prod' ? 'Internal Server Error' : err.message;
      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = {
        code: status,
        error,
      };
      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = 200;
    }
  };
};
