const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.bbbug && options.bbbug == app.globalData.systemVersion) {
      this.setData({
        url: 'https://bbbug.com'
      });
    }
  },
  onShareAppMessage() {}
})