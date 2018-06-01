var util = require('../../utils/util.js')
var config = require('../../config')
const { Dialog, extend } = require('../../vendor/zanui-weapp/dist/index');
// pages/useradmin/user.js


function changebool(e) {
  if (e == 0) {
    return false
  }
  if (e == 1) {
    return true
  }
  
}

function ChangeBool(e) {
  if (e == false) {
    return 0
  }
  if (e == true) {
    return 1
  }

}
Page(extend({}, Dialog,{

  /**
   * 页面的初始数据
   */
  data: {
    name: "test",
    openid: "",
    door1: "",
    door2: "",
    door3: "",
    door4: "",
    door1: false,
    door2: false,
    door3: false,
    door4: false,
    admin:false,
  },

  /**
/**
 * 生命周期函数--监听页面加载
 */

  onLoad: function (options) {
    var that = this
    that.setData({
      openid: options.id
    })
    wx.request({
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      data: { openid: options.id },
      url: config.service.getuser,
      success: function (res) {
        that.setData({
          name: res.data[0].name,
        });
      }
    })
    wx.request({
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      data: { openid: options.id },
      url: config.service.getdoor,
      success: function (res) {
        that.setData({
          door1: changebool(res.data.door1),
          door2: changebool(res.data.door2),
          door3: changebool(res.data.door3),
          door4: changebool(res.data.door4),
          admin: changebool(res.data.admin)
        });
      }
    })
  },
  switchChange1: function () {
    var that = this
    that.setData({
      door1: !that.data.door1

    })
  },
  switchChange2: function () {
    var that = this
    that.setData({
      door2: !that.data.door2

    })
  },
  switchChange3: function () {
    var that = this
    that.setData({
      door3: !that.data.door3

    })
  },
  switchChange4: function () {
    var that = this
    that.setData({
      door4: !that.data.door4

    })
  },
  switchChange5: function () {
    var that = this
    that.setData({
      admin: !that.data.admin

    })
  },

  push: function () {
    var that=this
    console.log(ChangeBool(that.data.door1))
    wx.request({
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      data: {
        openid: that.data.openid,
        door1: ChangeBool(that.data.door1),
        door2: ChangeBool(that.data.door2),
        door3: ChangeBool(that.data.door3),
        door4: ChangeBool(that.data.door4),
        admin: ChangeBool(that.data.admin)

      },
      url: config.service.setdoor,
      success: function (res) {
        if (res.data.message == 'success') {
          that.showZanDialog({
            content: '设置成功',
            showCancel: false,
            
          });
        }
        else {
          that.showZanDialog({
            content: '设置失败',
            showCancel: false,
          });
        }
      }
    })

  },

  del:function(){
    var that =this
    wx.request({
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      data: {
        openid: that.data.openid
      },
      url: config.service.deluser,
      success: function (res) {
        if (res.data.message == 'success') {
          that.showZanDialog({
            content: '设置成功',
            showCancel: false,

          });
        }
        else {
          that.showZanDialog({
            content: '设置失败',
            showCancel: false,
          });
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {

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