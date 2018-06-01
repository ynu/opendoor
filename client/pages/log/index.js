var util = require('../../utils/util.js')
var config = require('../../config')
const App =getApp()
Page({
  data: {
    message: '',
    show: 'none'
  },

 onShow: function() {
   var admin = 0
   var that = this
   wx.request({
     url: config.service.getdoor,
     header: { 'content-type': 'application/x-www-form-urlencoded' },
     method: 'POST',
     data: { openid: App.user.openid },
     success: res => {
       admin = res.data.admin
       if (admin == 1) {
         wx.request({
           header: { 'content-type': 'application/x-www-form-urlencoded' },
           method: 'POST',
           url: config.service.getlog,
           success: function (res) {
             console.log(res)
             that.setData({
               datas: res.data,
               message: 'none',
               show: 'search',
               searchLoading: true
             });
           },
         })

       }
     }
   })
  }
})