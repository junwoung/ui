const Sequelize = require('sequelize')
const conf = require('../../config/mysql').conf()

const seq = new Sequelize(conf.database, conf.user, conf.password, {
  host: conf.host,
  dialect: 'mysql',
  pool: {
    max: 30,
    min: 1,
    acquire: 30000,
    idle: 10000
  },
  charset: 'utf8',
  // logging: console.log,
  logging: false
})

module.exports = seq
