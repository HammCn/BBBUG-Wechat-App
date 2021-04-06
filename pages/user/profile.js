const app = getApp();
Page({
  data: {
    bbbug: false,
    userInfo: false,
    user_id: 0,
    songList: []
  },
  onLoad: function (options) {
    if (!options.bbbug || options.bbbug != app.globalData.systemVersion) {
      return;
    }
    this.setData({
      bbbug: true,
      user_id: options.user_id || 0
    });
  },
  onShow: function () {
    if (this.data.bbbug) {
      this.getUserInfo();
    }
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
        that.getSongList();
      }
    });
  },
  getUserDevice(device) {
    return device;
  },
  headImageTouched(e) {
    let url = e.mark.url;
    wx.showActionSheet({
      itemList: ['查看大图'],
      success: function (res) {
        if (res.tapIndex == 0) {
          wx.previewImage({
            urls: [url],
            current: url
          });
        }
      }
    })
  },
  getSongList() {
    let that = this;
    app.request({
      url: "song/getusersongs",
      data: {
        user_id: that.data.user_id
      },
      success(res) {
        that.setData({
          songList: res.data
        });
      }
    });
  },
})