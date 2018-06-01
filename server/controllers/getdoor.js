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
  var data=''
  await knex.column('door1','door2','door3','door4','super').select().from('qx').where('openid', '=', ctx.request.body.openid).then(res => {
    data = res[0]
    console.info({ data: data});
    ctx.body = { 
      door1: data.door1,
      door2: data.door2,
      door3: data.door3,
      door4: data.door4,
      admin: data.super
    };

  })


}

module.exports = {
  post
}
