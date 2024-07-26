const mysql = require('mysql')

const db = mysql.createPool({
  host: 'sql.wsfdb.cn', // 数据库IP地址
  port: 3306, // 端口号
  user: 'recklessZzzvuebloggerplus', // 数据库登录账号
  password: 'root', // 数据库登录密码
  database: 'recklesszzzvuebloggerplus', // 要操作的数据库
  charset: 'utf8mb4'
})

module.exports = db
