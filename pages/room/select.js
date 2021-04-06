const app = getApp();
Page({
  data: {
    bbbug: false,
    roomList: [],
    userInfo: false
  },
  onLoad(options) {
    if (!options.bbbug || options.bbbug != app.globalData.systemVersion) {
      return;
    }
    this.setData({
      bbbug: true
    });
    wx.setNavigationBarTitle({
      title: '切换房间',
    });
    this.getHotRooms();
    this.getMyInfo();
  },
  getMyInfo() {
    let that = this;
    app.request({
      url: "user/getmyinfo",
      success(res) {
        that.setData({
          userInfo: res.data
        });
      }
    });
  },
  doEnterRoom(e) {
    this.joinRoom(e.mark.room_id);
  },
  createRoom() {
    wx.navigateTo({
      url: '../room/create?bbbug=' + app.globalData.systemVersion,
    });
  },
  joinMyRoom() {
    if (this.data.userInfo && this.data.userInfo.myRoom) {
      this.joinRoom(this.data.userInfo.myRoom.room_id);
    }
  },
  getHotRooms() {
    let that = this;
    app.request({
      url: "room/hotRooms",
      loading: "读取中",
      success: function (res) {
        that.setData({
          roomList: res.data
        });
      }
    });
  },
  doEnterSearchRoom(e) {
    let room_id = e.detail.value;
    wx.setStorageSync('room_id', room_id);
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('changeRoomSuccess', room_id);
    wx.navigateBack();
  },
  joinRoom(room_id) {
    let that = this;
    const eventChannel = that.getOpenerEventChannel()
    let menu = ["切换房间"];
    wx.showActionSheet({
      itemList: menu,
      success(res) {
        switch (menu[res.tapIndex]) {
          case '切换房间':
            wx.setStorageSync('room_id', room_id);
            eventChannel.emit('changeRoomSuccess', room_id);
            wx.navigateBack();
            break;
          default:
        }
      }
    })
  }
})