/* eslint-disable no-empty-function */
/* eslint-disable strict */
/* eslint-disable no-unused-vars */
class AppBootHook {
  constructor(app) {
    this.app = app;
    app.root_path = __dirname;
  }
  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
  }
  configDidLoad() {
    // Config, plugin files have been loaded
  }
  async disLoad() {
    // All files have loaded, start plugin here.
  }
  async willReady() {
    // All plugin have started, can do some thing before app ready
  }
  async didReady() {
    // Worker is ready, can do some things
    // do not need to block this app boot
    console.log('=======Init Data========');
    const ctx = await this.app.createAnonymousContext();
    await ctx.model.User.remove();

    await ctx.service.user.create({
      mobile: '15001114095',
      password: '130609',
      realName: 'CZ',
    });
  }
  async serviceDidReady() {

  }
  async beforeClose() {
    // Dom some thing before app close
  }
}

module.exports = AppBootHook;
