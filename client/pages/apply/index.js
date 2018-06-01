const App = getApp()
var util = require('../../utils/util.js')
var config = require('../../config')
const { Dialog, extend } = require('../../vendor/zanui-weapp/dist/index');
// pages/apply/index.js
Page(extend({}, Dialog,{

  /**
   * 页面的初始数据
   */
  data: {
  name:'',
  tel:'',
  message: '',
  show: 'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (App.user.openid != null) {
      this.setData({
        userInfo: App.user.userinfo,
        nickname: true,
        Nickname: App.user.nickname,
        nickname: true,
        message: 'none',
        show: 'search',
        unit: '',
        name:'',
        tel:'',
      })
    }
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
input:function(e){
  var that=this
  if (e.target.id==1){
    that.setData({
      name: e.detail.value
    })
  } else if(e.target.id == 2){
    that.setData({
      tel: e.detail.value
    })
  } else if (e.target.id ==3) {
    that.setData({
      unit: e.detail.value
    })
  }
},

push:function(){
  var that =this
  if (that.data.name == '' || that.data.tel == '' || that.data.unit==''){
    that.showZanDialog({
      content: '请填写所有项目',
      showCancel: false,
    })
  }else{
  wx.request({
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    data: {
      openid: App.user.openid,
    },
    url: config.service.getuser,
    success: function (res) {
      if (res.data.length>0){
      that.showZanDialog({
        content: '您已提交过申请',
        showCancel: false,
      });
    }else{

        wx.request({
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          method: 'POST',
          data: {
            openid: App.user.openid,
            nickName: App.user.nickname,
            name: that.data.name,
            tel: that.data.tel,
            unit: that.data.unit

          },
          url: config.service.insertuser,
          success: function (res) {
            that.showZanDialog({
              content: '提交成功',
              showCancel: false,
            });
          }
        })
    }
    }
  })
  }
},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
}))