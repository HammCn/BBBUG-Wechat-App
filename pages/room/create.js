const app = getApp()

/**
 * 页面的初始数据
 */
Page({
  data: {
    bbbug: false,
    room_name: "",
    room_notice: ""
  },
  onLoad: function (options) {
    if (!options.bbbug) {
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
      url: "room/create",
      data: postData,
      loading: "创建中",
      success(res) {
        console.log(res);
        let room_id = res.data.room_id;
        wx.showModal({
          title: "创建成功",
          content: res.msg,
          confirmText: "立即进入",
          cancelText: "好的",
          success(result) {
            if (result.confirm) {
              wx.setStorageSync('room_id', room_id);
              wx.reLaunch({
                url: '../index/index',
              });
            } else {
              wx.navigateBack();
            }
          }
        });
      }
    });
  },
});