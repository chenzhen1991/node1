'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
  async index() {
    // this.ctx.body = {
    //   name: 'Ctrl',
    // };

    // 调用service层
    const { ctx } = this;
    ctx.body = await ctx.service.user.getAll();
  }
}

module.exports = UserController;
