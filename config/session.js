/**
* @author: wangjun
* @date: 2019-10-24 14:44:28
* @desc: 设置session过期时间
*/

const expressSession = require('express-session')

module.exports = class Session {
  //  设置session
  static setSession () {
   return expressSession({
      secret: 'test',
      resave: false,
      saveUninitialized: true,
      cookie: {
        //  过期时间
        maxAge: 60 * 60 * 1000
      }
    })
  }
  //  每次请求都重新刷新session过期时间
  static flushSession (req, res, next) {
    req.session._garbage = Date()
    req.session.touch()
    next()
  }
}