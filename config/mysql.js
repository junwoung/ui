/**
* @author: wangjun
* @date: 2019-10-24 16:53:51
* @desc: 配置mysql
*/

const mysql = require('mysql')
const conf = {
  host: '120.24.98.124',
  user: 'root',
  password: 'Root123456.',
  database: 'frame'
}

module.exports = class Mysql {
  static conf () {
    return conf
  }
  static conn () {
    let connection = mysql.createConnection(conf)
    connection.connect()
    return connection
  }
}