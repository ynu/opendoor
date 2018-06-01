const App = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const { Dialog, extend } = require('../../vendor/zanui-weapp/dist/index');
Page(extend({}, Dialog, {
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',

  },
  onShow: function (e) {
    const that = this;
    that.setData({
      disabled1: true,
      disabled2: true,
      disabled3: true,
      disabled4: true
    })
    if (App.user.openid != null) {
      wx.request({
        url: config.service.getdoor,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        data: { openid: App.user.openid },
        success: function (res) {
          if (res.data.door1 == 1) {
            that.setData({
              disabled1: false
            })
          }
          if (res.data.door2 == 1) {
            that.setData({
              disabled2: false
            })
          }
          if (res.data.door3 == 1) {
            that.setData({
              disabled3: false
            })
          }
          if (res.data.door4 == 1) {
            that.setData({
              disabled4: false
            })
          }
          that.setData({
            userInfo: App.user.userinfo,
            nicename: true
          }),
            that.setData({
              Nickname: App.user.nickname,
              nickname: true
            })

        },
      })
    }

  },

  door: function (event) {
    // 请求服务端特定接口，执行开门
    var id = event.target.id
    const that = this;
    wx.request({
      url: config.service.openDoorUrl,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      data: { id: id, openid: App.user.openid },
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
}))