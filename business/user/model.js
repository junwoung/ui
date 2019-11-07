const user = require('../sequelize/user')

module.exports = class User {
  static getList (params) {
    return new Promise ((resolve, reject) => {
      user.findAll()
      .then(data => resolve(data))
      .catch(err => reject(err))
    })
  }
}