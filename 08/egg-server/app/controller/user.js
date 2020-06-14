'use strict';
const { Controller } = require('egg');

/**
* @Controller 用户管理
*/
class UserController extends Controller {
  // eslint-disable-next-line no-useless-constructor
  constructor(ctx) {
    super(ctx);
  }

  /**
   * @summary 创建用户
   * @description 创建用户 记录用户账户、密码、类型
   * @router post /api/user
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx } = this;

    // 接口校验
    ctx.validate(ctx.rule.createUserRequest);
    const res = {
      abc: 123,
    };
    // 设置响应内容
    ctx.helper.success({ ctx, res });
  }
}

module.exports = UserController;
