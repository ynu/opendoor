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
async function post(ctx, next) {
  var data = ''
  await knex('qx').insert({ door1: '0', door2: '0', door3: '0', door4: '0', openid: ctx.request.body.openid,super:'0'}).then(
    res =>{
      console.log(res)

    }
  )
  await knex('user').insert({ openid: ctx.request.body.openid, nickName: ctx.request.body.nickName, name: ctx.request.body.name, tel: ctx.request.body.tel,unit:ctx.request.body.unit})


}

module.exports = {
  post
}
