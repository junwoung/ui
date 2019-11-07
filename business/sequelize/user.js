const Seq = require('sequelize')
const seq = require('./sequelize')

const User = seq.define('tp_user', {
  id: {
    type: Seq.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Seq.STRING(16),
    allowNull: false,
    validate: {
      len: {
        args: [2, 16],
        msg: '姓名长度需控制在2-16'
      }
    }
  },
  nickname: {
    type: Seq.STRING(16)
  },
  password: {
    type: Seq.STRING(32)
  },
  salt: {
    type: Seq.STRING(4)
  },
  avatar: {
    type: Seq.STRING(128),
    // validate: {
    //   checkAvatar (value) {
    //     if (this.getDataValue('gender') == 1) {
    //       if (!value) throw new Error('头像必传')
    //     }
    //   }
    // }
  },
  email: {
    type: Seq.STRING(32),
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: Seq.STRING(16),
    validate: {
      isPhone (value) {
        if (value.length !== 11) {
          throw new Error('手机号码不合法')
        }
      }
    }
  },
  birth: {
    type: Seq.DATEONLY,
    validate: {
      len: [10, 10],
      isDate: true,
      isBefore: global.utils.getDate('', 'day')
    }
  },
  register_time: {
    type: Seq.DATE
  },
  host_page: {
    type: Seq.STRING(64),
    validate: {
      isUrl: true
    }
  },
  type: {
    type: Seq.TINYINT,
    validate: {
      isIn: [[0, 1, 2]]
    }
  },
  last_login: {
    type: Seq.DATE
  }
}, {
  freezeTableName: true,
  timestamps: false,
  tableName: 'user',
  underscored: true
})

module.exports = User