const fetch = require('node-fetch');
const fs = require('fs')
const path = require('path')
const { mysql: config, backend_opendoor_host } = require('../config')
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
  // ctx.body = { message: 'ok' };
  // 执行开门的UDP请求
  try {
    const response = await fetch(`${backend_opendoor_host}?door=${ctx.request.body.id}`);
    const responseJson = await response.json();
    
    if (responseJson.message == "successful") {
      // 设置返回的内容
      await knex('log').insert({ openid: ctx.request.body.openid, door: ctx.request.body.id})
      console.info({ message: 'ok', data: responseJson.data });
      ctx.body = { message: 'ok', data: responseJson.data };
    }
    else {
      console.info({ message: 'failed', data: responseJson.data });
      ctx.body = { message: 'failed', data: responseJson.data };
    }
  }
  catch (err) {
    console.error(err);
    ctx.body = { message: 'error', data: err };
  }
}

module.exports = {
  post
}