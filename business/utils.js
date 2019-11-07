module.exports = class Utils {
  //  验证参数是否合法
  static check (params, conf) {
    let errors = {}
    for (let key in conf) {
      let item = conf[key]
      let param = params[key]
      let desc = item.title || key
      //  必填校验
      if (item.must) {
        if (!this.isSet(param)) {
          errors[key] = `${desc}必填`
          continue
        }
      }
      //  当param不为空，继续
      if (param) {
        //  值类型校验，可接收单个字符串或者字符串数组
        if (item.type) {
          if (!item.type.includes(this.getType(param))) {
            errors[key] = `${desc}值类型错误，必须为${item.type.toString}`
            continue
          }
        }
        //  最大长度
        if (item.maxLength) {
          if (item.maxLength < param.length) {
            errors[key] = `${desc}长度不可超过${item.maxLength}`
            continue
          }
        }
        //  最小长度
        if (item.minLength) {
          if (item.minLength > param.length) {
            errors[key] = `${desc}长度不可小于${item.minLength}`
            continue
          }
        }
        //  最大值
        if (item.max) {
          if (item.max < param) {
            errors[key] = `${desc}值不可超过${item.max}`
            continue
          }
        }
        //  最小值
        if (item.min) {
          if (item.min > param) {
            errors[key] = `${desc}值不可小于${item.min}`
            continue
          }
        }
        //  取值范围
        if (item.in) {
          if (!item.in.includes(param)) {
            errors[key] = `${desc}值超过给定范围${item.in.join(',')}`
            continue
          }
        }
      }
    }
    return errors
  }
  //  判断值是否设置，只有当为undefined / null / '' 才会返回false
  static isSet (val) {
    return val || (val !== undefined && val !== null && val !== '')
  }
  //  判断值是否为空,空数组、空对象、空值都判定为空
  static isEmpty (val) {
    let type = this.getType(val)
    switch (type) {
      case 'object': return !Object.keys(val).length
      case 'array': return !val.length
      case 'number': return false  //  数值一律视为非空，包括0
      case 'string': return val === ''
      default: return false
    }
  }
  //  获取参数类型并转成小写
  static getType (val) {
    let type = {}.toString.call(val) //  [object (any)]
    type = type.slice(8, type.length - 1)
    return type && type.toLowerCase()
  }
  //  获取指定精度日期
  static getDate (date = '', format = 'day') {
    if (!date) date = new Date()
    switch (this.getType(date)) {
      case 'number':
      case 'string':
        date = new Date(date)
        break
      case 'date':
        date = date
        break
      default:
        date = new Date()
    }
    let [y, m, d, h, i, s] = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()]
    m = m > 9 ? m : ('0' + m)
    d = d > 9 ? d : ('0' + d)
    h = h > 9 ? h : ('0' + h)
    i = i > 9 ? i : ('0' + i)
    s = s > 9 ? s : ('0' + s)
    let [dateArr, timeArr] = [[], []]
    switch (format) {
      case 'year': {
        dateArr = [y]
        break
      }
      case 'month': {
        dateArr = [y, m]
        break
      }
      case 'day': {
        dateArr = [y, m, d]
        break
      }
      case 'hour': {
        dateArr = [y, m, d]
        timeArr = [h]
        break
      }
      case 'minute': {
        dateArr = [y, m, d]
        timeArr = [h, i]
        break
      }
      case 'second': {
        dateArr = [y, m, d]
        timeArr = [h, i, s]
        break
      }
      default: 
        dateArr = [y, m, d]
        timeArr = [h, i, s]
    }
    let [dateStr, timeStr] = [dateArr.join('-'), timeArr.join(':')]
    if (timeStr) return `${dateStr} ${timeStr}`
    else return dateStr
  }
  //  封装返回参数
  static sealRes (code, msg, data) {
    if (arguments.length === 1) {
      return {
        ret: {
          retCode: '0',
          retMsg: '成功'
        },
        data: arguments[0]
      }
    }
    return {
      ret: {
        retCode: code + '',
        retMsg: msg
      },
      data: data
    }
  }
  //  封装异常信息为返回信息
  static sealError (code, error) {
    let msg = ''
    switch (error.name) {
      case 'SequelizeValidationError': {
        msg = error.errors[0].message
        break
      }
      case 'SequelizeDatabaseError': {
        msg = error.original.sqlMessage
        break
      }
      default: msg = error.errors[0].message
    }
    return Utils.sealRes(code, msg, error)
  }
  //  大写驼峰转化为指定字符串风格驼峰
  static parseCamel (obj, delimeter = '_') {
    switch (this.getType(obj)) {
      case 'string': {
        return parse(obj)
      }
      case 'object': {
        let newObj = {}
        for (let key in obj) {
          newObj[parse(key)] = obj[key]
        }
        return newObj
      }
      case 'array': {
        return obj.map(item => parse(item))
      }
      default: return false
    }
    function parse (str) {
      str = str.replace(/[A-Z]/g, arg => `${delimeter}${arg.toLowerCase()}`)
      return str
    }
  }
}