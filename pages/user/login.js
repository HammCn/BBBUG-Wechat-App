const app = getApp()

/**
 * 页面的初始数据
 */
Page({
  data: {
    bbbug: false,
    user_account: "",
    user_password: ""
  },
  onLoad: function (options) {
    if (!options.bbbug || options.bbbug != app.globalData.systemVersion) {
      return;
    }
    this.setData({
      bbbug: true
    });
    wx.hideNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '　',
    });
  },
  formSubmit: function (e) {
    let that = this;
    let postData = e.detail.value;
    app.request({
      url: "user/login",
      data: postData,
      loading: "登录中",
      success(res) {
        wx.setStorageSync('access_token', res.data.access_token);
        app.globalData.access_token_changed = true;
        const eventChannel = that.getOpenerEventChannel()
        eventChannel.emit('loginSuccess', null);
        wx.navigateBack();
      }
    });
  },
  userAccountChanged(e) {
    this.data.user_account = e.detail.value;
  },
  wxLogin() {
    let that = this;
    wx.login({
      success(res) {
        if (res.code) {
          app.request({
            url: "weapp/wxAppLogin",
            data: {
              code: res.code
            },
            loading: "登录中",
            success(res) {
              wx.setStorageSync('access_token', res.data.access_token);
              app.globalData.access_token_changed = true;
              const eventChannel = that.getOpenerEventChannel()
              eventChannel.emit('loginSuccess', null);
              wx.navigateBack();
            },
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  sendMail() {
    let that = this;
    app.request({
      url: "sms/email",
      loading: '发送中',
      data: {
        email: that.data.user_account
      },
      success(res) {
        wx.showToast({
          title: '发送成功',
        });
      }
    });
  }
})