const fetch = require('node-fetch');

async function get(ctx, next) {
  // ctx.body = { message: 'ok' };
  // 执行开门的UDP请求
  try {
    const response = await fetch('http://opendoor.ynu.test.ynu.edu.cn/opendoor?door=1');
    const responseJson = await response.json();
    if (responseJson.message == "successful") {
      // 设置返回的内容
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
  get
}