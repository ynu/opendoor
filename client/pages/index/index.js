//index.js
const App = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
let openid = ''
let nickname = ''
const { Dialog, extend } = require('../../vendor/zanui-weapp/dist/index');
Page(extend({}, Dialog, {
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  // 用户登录示例
  login: function () {
    if (this.data.logged) return
    util.showBusy('正在登录')
    var that = this
    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              util.showSuccess('登录成功')
              App.user.openid = result.data.data.openId
              App.user.nickname = result.data.data.nickName
              App.user.userinfo = result.data.data
              that.setData({
                userInfo: result.data.data,
                logged: true,
                user: true,
                message: `欢迎 ${App.user.nickname}`,
                Message: true,
              })
            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              util.showSuccess('登录成功')
              App.user.openid = result.data.data.openId
              App.user.nickname = result.data.data.nickName
              App.user.userinfo = result.data.data
              that.setData({
                userInfo: result.data.data,
                logged: true,
                user: true,
                message: `欢迎 ${App.user.nickname}`,
                Message: true,
              })
            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })

  },

  show: function (){
    var that = this;
    that.setData({
      showview: (!that.data.showview)})
      
  },
  getuser: function () {
    this.showZanDialog({
      content: nickname,
      showCancel: false,
    });
  },
  // 切换是否带有登录态
  switchRequestMode: function (e) {
    this.setData({
      takeSession: e.detail.value
    })
    this.doRequest()
  },

  doRequest: function () {
    util.showBusy('请求中...')
    var that = this
    var options = {
      url: config.service.requestUrl,
      login: true,
      success(result) {
        util.showSuccess('请求成功完成')
        console.log('request success', result)
        that.setData({
          requestResult: JSON.stringify(result.data)
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    }
    if (this.data.takeSession) {  // 使用 qcloud.request 带登录态登录
      qcloud.request(options)
    } else {    // 使用 wx.request 则不带登录态
      wx.request(options)
    }
  },

  test: function () {
    const that = this;
    wx.request({
      url: config.service.test,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      data: { openid: openid, nickname: nickname },
      success: function (res) {
        console.log(res.data);
        that.showZanDialog({
          content: res.data.data,
          showCancel: false,
        });
      }
    })
  },

  opendoor: function () {
    // 请求服务端特定接口，执行开门
    const that = this;
    wx.request({
      url: config.service.openDoorUrl,
      success: function (res) {
        console.log(res.data);
        if (res.data.message == 'ok') {
          that.showZanDialog({
            content: '开门成功',
            showCancel: false,
          });
        }
        else {
          that.showZanDialog({
            content: '开门失败',
            showCancel: false,
          });
        }
      },
      fail: function (res) {
        console.error(res.data);
        that.showZanDialog({
          content: '发送开门请求错误',
          showCancel: false,
        });
      }
    });

  },
}

));
