let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    news_id: 0,
    timer: false,
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      news_id: options.news_id
    });
    app.request({
      url: "/index/detail",
      data: {
        id: that.data.news_id
      },
      success(res) {
        that.setData({
          item: res.data
        });
      }
    });
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

  },
  taps() {
    let that = this;
    that.data.count++;
    if (that.data.count >= 10) {
      wx.showToast({
        title: '再按次' + (15 - that.data.count) + '解锁',
      })
      clearTimeout(that.data.timer);
      that.data.timer = setTimeout(function () {
        that.data.count = 0;
      }, 5000);
    }
    if (that.data.count >= 15) {
      app.globalData.systemVersion = new Date().valueOf();
      wx.reLaunch({
        url: '../index/index',
      })
    }
  }
})