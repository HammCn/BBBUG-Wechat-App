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
      title: '搜索点歌',
    });
  },
  doSearchSong(e) {
    let that = this;
    app.request({
      url: "song/search",
      loading: "搜索中",
      data: {
        keyword: e.detail.value
      },
      success: function (res) {
        that.setData({
          songList: res.data
        });
      }
    });
  },
  showMenu(e) {
    let song = e.mark.item;
    let menu = ["点歌", "收藏"];
    if (app.globalData.roomInfo && app.globalData.userInfo && app.globalData.roomInfo.room_type == 4 && app.globalData.roomInfo.room_user == app.globalData.userInfo.user_id) {
      menu = ["播放", "收藏"];
    }
    wx.showActionSheet({
      itemList: menu,
      success(res) {
        switch (menu[res.tapIndex]) {
          case '点歌':
            app.request({
              url: 'song/addSong',
              data: {
                mid: song.mid,
                at: false,
                room_id: app.globalData.roomInfo.room_id
              },
              loading: "点歌中",
              success: function (res) {
                wx.showToast({
                  title: '点歌成功'
                });
              }
            });
            break;
          case '收藏':
            app.request({
              url: "song/addMySong",
              data: {
                room_id: app.globalData.roomInfo.room_id,
                mid: song.mid,
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
                mid: song.mid,
                room_id: app.globalData.roomInfo.room_id
              },
              loading: "播放中",
              success: function (res) {
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