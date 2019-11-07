const routers = [
  {
    pre: 'hello',
    router: require('../business/hello/index')
  },
  {
    pre: 'user',
    router: require('../business/user/index')
  }
]

//  批量注册路由
module.exports = class Routers {
  static register (app) {
    routers.forEach(item => {
      app.use(`/${item.pre}`, item.router)
    })
  }
}