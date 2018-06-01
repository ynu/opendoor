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
  await knex('qx').where('openid', '=', ctx.request.body.openid).update({ door1: ctx.request.body.door1, door2: ctx.request.body.door2, door3: ctx.request.body.door3, door4: ctx.request.body.door4, super: ctx.request.body.admin }).then(res => {
    data = res[0]
    console.info({ data: data });
    if(res==1){
    ctx.body = {
      message: "success"

    };
    }
  })


}

module.exports = {
  post
}
