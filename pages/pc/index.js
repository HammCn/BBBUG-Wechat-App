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
    if (options.bbbug) {
      this.setData({
        url: options.url ? decodeURIComponent(options.url) : 'https://bbbug.com'
      });
    }
  },
  onShareAppMessage() {}
})