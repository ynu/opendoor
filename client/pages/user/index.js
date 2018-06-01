const App = getApp()

Page({
  data: {
    userInfo: {},
  },

  onShow: function (e) {
    if (App.user.openid != null) {
      this.setData({
        userInfo: App.user.userinfo,
        nickname: true
      }),
        this.setData({
          Nickname: App.user.nickname,
          nickname: true
        })
    }
  },
  useradmin(e) {
    wx.navigateTo({url:"../useradmin/index"})
  },
  log(e) {
    wx.navigateTo({ url:"../log/index"})
  },
  apply(e) {
    wx.navigateTo({ url:"../apply/index"})
  }
})