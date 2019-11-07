const model = require('./model')

module.exports = class Controller {
  static async getList (req, res, next) {
    let ret
    let data = await model.getList().catch(err => {
      ret = global.utils.sealError('0010001', err)
    })
    if (!ret) {
      ret = global.utils.sealRes(data)
    }
    res.send(ret)
  }
}