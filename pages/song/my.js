const app = getApp();
Page({
  data: {
    bbbug: false,
    songList: [],
    room_id: 0,
    page: 1,
    isLoading: false,
  },
  onLoad(options) {
    if (!options.bbbug || options.bbbug != app.globalData.systemVersion) {
      return;
    }
    this.setData({
      bbbug: true
    });
    wx.setNavigationBarTitle({
      title: '我的歌单',
    });
    this.getSongList();
  },
  onPullDownRefresh() {
    this.page = 1;
    this.getSongList();
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    if (!this.data.isLoading) {
      this.data.page++;
      this.getSongList();
    }
  },
  getSongList() {
    let that = this;
    if (that.data.isLoading) {
      return;
    }
    that.data.isLoading = true;
    app.request({
      url: "song/mySongList",
      loading: "加载中",
      data: {
        page: that.data.page
      },
      success: function (res) {
        let songList = that.data.songList;
        if (that.data.page == 1) {
          songList = [];
        }
        songList = songList.concat(res.data);
        that.setData({
          songList: songList
        });
        that.data.isLoading = false;
      },
      error() {
        that.data.isLoading = false;
      }
    });
  },
  showMenu(e) {
    let that = this;
    let song = e.mark.item;
    let menu = ["点歌", "移除"];
    if (app.globalData.roomInfo && app.globalData.userInfo && app.globalData.roomInfo.room_type == 4 && app.globalData.roomInfo.room_user == app.globalData.userInfo.user_id) {
      menu = ["播放", "移除"];
    }
    wx.showActionSheet({
      itemList: menu,
      success(res) {
        switch (menu[res.tapIndex]) {
          case '点歌':
            app.request({
              url: 'song/addSong',
              loading: "点歌中",
              data: {
                mid: song.mid,
                room_id: app.globalData.roomInfo.room_id
              },
              success: function (res) {
                that.getSongList();
                wx.showToast({
                  title: '点歌成功'
                });
              }
            });
            break;
          case '移除':
            app.request({
              url: 'song/deleteMySong',
              loading: "移除中",
              data: {
                mid: song.mid,
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
          case '播放':
            app.request({
              url: 'song/playSong',
              data: {
                mid: song.mid,
                room_id: app.globalData.roomInfo.room_id
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