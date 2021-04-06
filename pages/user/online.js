const app = getApp();
Page({
  data: {
    bbbug: false,
    roomInfo: {},
    userList: [],
  },
  onLoad(options) {
    if (!options.bbbug || options.bbbug != app.globalData.systemVersion) {
      return;
    }
    this.setData({
      bbbug: true,
      roomInfo: app.globalData.roomInfo
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
  doubleTapToTouchUser() {
    let that = this;
    const eventChannel = that.getOpenerEventChannel()
    eventChannel.emit('doAtUser', user);
    wx.navigateBack();
  },
  openProfile(e) {
    wx.navigateTo({
      url: '../user/profile?user_id=' + e.mark.user.user_id,
    });
  },
  showMenuMaster(e) {
    let that = this;
    let user = e.mark.item;
    let menu = ["禁止点歌", "禁止发言", "解除限制"];;
    if (!(app.globalData.roomInfo && app.globalData.userInfo && (app.globalData.roomInfo.room_user == app.globalData.userInfo.user_id || app.globalData.userInfo.user_admin))) {
      console.log("你没有权限");
      return;
    }
    if (app.globalData.roomInfo.room_type == 4) {
      if (user.user_guest) {
        menu.push('取消嘉宾');
      } else {
        menu.push('设为嘉宾');
      }
    }
    let eventChannel = that.getOpenerEventChannel()
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
          case '设为嘉宾':
          case '取消嘉宾':
            app.request({
              url: "user/guestctrl",
              data: {
                room_id: app.globalData.roomInfo.room_id,
                user_id: user.user_id
              },
              success(res) {
                wx.showToast({
                  title: res.msg
                });
                that.getList();
              }
            });
            break;
            break;
          default:
            wx.showToast({
              title: '即将上线',
            });
        }
      }
    })
  },
  showMenu(e) {
    let that = this;
    let user = e.mark.item;
    let menu = ["@Ta一下", "摸一摸Ta", "查看主页"];
    let eventChannel = that.getOpenerEventChannel()
    wx.showActionSheet({
      itemList: menu,
      success(res) {
        switch (menu[res.tapIndex]) {
          case '@Ta一下':
            eventChannel.emit('doAtUser', user);
            wx.navigateBack();
            break;
          case '摸一摸Ta':
            eventChannel.emit('doTouchUser', user.user_id);
            break;
          case '查看主页':
            wx.navigateTo({
              url: '../user/profile?bbbug=' + app.globalData.systemVersion + '&user_id=' + user.user_id,
            })
            break;
          default:
            wx.showToast({
              title: '即将上线',
            });
        }
      }
    });
  }
})