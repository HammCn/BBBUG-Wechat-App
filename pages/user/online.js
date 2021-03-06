const app = getApp();
Page({
  data: {
    bbbug: false,
    userList: [],
  },
  onLoad(options) {
    if (!options.bbbug) {
      return;
    }
    this.setData({
      bbbug: true
    });
    wx.setNavigationBarTitle({
      title: '在线用户',
    });
    this.getList();
  },
  onPullDownRefresh() {
    this.getList();
    wx.stopPullDownRefresh();
  },
  getList() {
    let that = this;
    app.request({
      url: "user/online",
      loading: "加载中",
      data: {
        room_id: app.globalData.roomInfo.room_id
      },
      success: function (res) {
        that.setData({
          userList: res.data
        });
      }
    });
  },
  showMenu(e) {
    let that = this;
    let user = e.mark.item;
    let menu = ["查看主页"];
    if (app.globalData.roomInfo && app.globalData.userInfo && (app.globalData.roomInfo.room_user == app.globalData.userInfo.user_id || app.globalData.userInfo.user_admin)) {
      menu = ["查看主页", "禁止点歌", "禁止发言", "解除限制"];
    }
    wx.showActionSheet({
      itemList: menu,
      success(res) {
        switch (menu[res.tapIndex]) {
          case '禁止点歌':
            app.request({
              url: 'user/songdown',
              data: {
                room_id: app.globalData.roomInfo.room_id,
                user_id: user.user_id
              },
              loading: "禁言中",
              success(res) {
                wx.showToast({
                  title: res.msg
                });
                that.getList();
              }
            });
            break;
          case '禁止发言':
            app.request({
              url: 'user/shutdown',
              data: {
                room_id: app.globalData.roomInfo.room_id,
                user_id: user.user_id
              },
              loading: "禁言中",
              success(res) {
                wx.showToast({
                  title: res.msg
                });
                that.getList();
              }
            });
            break;
          case '解除限制':
            app.request({
              url: 'user/removeban',
              data: {
                room_id: app.globalData.roomInfo.room_id,
                user_id: user.user_id
              },
              loading: "解禁中",
              success(res) {
                wx.showToast({
                  title: res.msg
                });
                that.getList();
              }
            });
            break;
          case '查看主页':
            wx.navigateTo({
              url: '../user/profile?bbbug=1&user_id=' + user.user_id,
            })
            break;
          default:
            wx.showToast({
              title: '即将上线',
            });
        }
      }
    })
  }
})