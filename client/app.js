//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
import WxValidate from './assets/plugins/wx-validate/WxValidate'
import WxService from './assets/plugins/wx-service/WxService'
var WXBizDataCrypt = require('utils/RdWXBizDataCrypt.js');

App({
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl)
  },

  globalData: {
    userInfo: null,
  },

  user:{
    openid:null,
    nickname:null,
    userinfo:null,
    admin:null

  },
  	WxService: new WxService,
})