const app = getApp();
Page({
  data: {
    bbbug: false,
    songList: [],
    room_id: 0,
  },
  onLoad(options) {
    if (!options.bbbug) {
      return;
    }
    this.setData({
      bbbug: true
    });
    wx.setNavigationBarTitle({
      title: '待播放列表',
    });
    this.getSongList();
  },
  onPullDownRefresh() {
    this.getSongList();
    wx.stopPullDownRefresh();
  },
  getSongList() {
    let that = this;
    app.request({
      url: "song/songList",
      loading: "加载中",
      data: {
        room_id: app.globalData.roomInfo.room_id
      },
      success: function (res) {
        that.setData({
          songList: res.data
        });
      }
    });
  },
  showMenu(e) {
    let that = this;
    let song = e.mark.item;
    let menu = ["顶歌", "收藏"];
    if (app.globalData.roomInfo && app.globalData.userInfo && (app.globalData.roomInfo.room_user == app.globalData.userInfo.user_id || app.globalData.userInfo.user_admin || app.globalData.userInfo.user_id == song.user.user_id)) {
      menu = ["顶歌", "收藏", "移除"];
    }
    wx.showActionSheet({
      itemList: menu,
      success(res) {
        switch (menu[res.tapIndex]) {
          case '顶歌':
            app.request({
              url: 'song/push',
              loading: "置顶中",
              data: {
                mid: song.song.mid,
                room_id: app.globalData.roomInfo.room_id
              },
              success: function (res) {
                that.getSongList();
                if (app.globalData.roomInfo && app.globalData.userInfo && (app.globalData.roomInfo.room_user == app.globalData.userInfo.user_id || app.globalData.userInfo.user_admin)) {
                  wx.showToast({
                    title: '置顶成功'
                  });
                } else {
                  wx.showModal({
                    title: "置顶成功",
                    content: res.msg,
                    showCancel: false,
                  });
                }
              }
            });
            break;
          case '移除':
            app.request({
              url: 'song/remove',
              loading: "移除中",
              data: {
                mid: song.song.mid,
                room_id: app.globalData.roomInfo.room_id
              },
              success: function (res) {
                that.getSongList();
                wx.showToast({
                  title: '移除成功'
                });
              }
            });
            break;
          case '收藏':
            app.request({
              url: "song/addMySong",
              data: {
                room_id: app.globalData.roomInfo.room_id,
                mid: song.song.mid,
              },
              loading: "收藏中",
              success: function (res) {
                wx.showToast({
                  title: "收藏成功"
                });
              }
            });
            break;
          case '播放':
            app.request({
              url: 'song/playSong',
              data: {
                room_id: app.globalData.roomInfo.room_id,
                mid: song.song.mid,
              },
              loading: "播放中",
              success: function (res) {
                that.getSongList();
                wx.showToast({
                  title: '播放成功'
                });
              }
            });
            break;
          default:
        }
      }
    })
  }
})