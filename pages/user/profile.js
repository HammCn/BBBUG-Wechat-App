const app = getApp();
Page({
  data: {
    userInfo: false,
    user_id: 0,
  },
  onLoad: function (options) {
    this.setData({
      user_id: options.user_id || 0
    });
  },
  onShow: function () {
    this.getUserInfo();
  },
  getUserInfo() {
    let that = this;
    app.request({
      url: "user/getuserinfo",
      data: {
        user_id: that.data.user_id
      },
      success(res) {
        that.setData({
          userInfo: res.data
        });
      }
    });
  },
  getUserDevice(device) {
    console.log(device)
    return device;
  }
})