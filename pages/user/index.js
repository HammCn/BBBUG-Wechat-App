const app = getApp();
Page({
  data: {

  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.getMyInfo();
  },
  doCreateRoom() {
    uni.navigateTo({
      url: '../?bbbug=' + app.globalData.systemVersion
    });
  },
  doJoinMyRoom() {
    let that = this;
    uni.showModal({
      title: '换房提醒',
      content: '换房将退出之前所在的房间,是否确认?',
      cancelText: '停留',
      confirmColor: '#FF4500',
      confirmText: '确认',
      success: function (res) {
        if (res.confirm) {
          uni.showLoading({
            title: '连接房间中'
          });
          that.doLoopToEnter(that.userInfo.myRoom);
        }
      }
    });
  },
  getMyInfo() {
    let that = this;
    app.request({
      url: "user/getmyinfo",
      success(res) {
        that.setData({
          userInfo: res.data
        });
      }
    });
  },
  doLogout() {
    let that = this;
    wx.showModal({
      title: "退出登录",
      content: "是否确认退出当前登录的帐号?",
      confirmColor: "#f00",
      confirmText: "退出",
      success(res) {
        if (res.confirm) {
          app.globalData.userInfo = app.globalData.guestUserInfo;
          app.globalData.request.baseData.access_token = app.globalData.guestUserInfo.access_token;
          wx.setStorageSync('access_token', app.globalData.guestUserInfo.access_token);
          wx.redirectTo({
            url: '../index/index',
          });
        }
      }
    });
  }
})