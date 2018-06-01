const fs = require('fs')
const path = require('path')
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
  var data = ''
  if (ctx.request.body.openid == 'all') {
    await knex.column('openid', 'name', 'tel','unit').select().from('user').then(res => {
      data = res[0]

      ctx.body = res

    })
  }
  else {
    await knex.column('openid', 'name', 'tel').select().from('user').where('openid', '=', ctx.request.body.openid).then(res => {
      data = res[0]

      ctx.body = res

    })
  }

}

module.exports = {
  post
}
