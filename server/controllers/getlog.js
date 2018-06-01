const fs = require('fs')
const path = require('path')
const moment = require('moment-timezone')
const { mysql: config } = require('../config')
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.pass,
    database: config.db,
    charset: config.char,
    multipleStatements: true
  }
})
// function mysql(ctx){
//   knex.column('nickName').select().from('user').where('openid', '=', ctx).then(res => {
//     var data1=res[0]
//     return data1

//   })

// }
async function post(ctx, next) {
  var data=''
  await knex('log').join('user', 'user.openid', '=', 'log.openid').select('user.name', 'user.unit','log.door','log.time').then(res => {
    for(let item of res) {
      item.time = moment(item.time).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
    }
    ctx.body = res;
  })


}

module.exports = {
  post
}
