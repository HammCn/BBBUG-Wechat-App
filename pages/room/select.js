const app = getApp();
Page({
  data: {
    roomList: [],
  },
  onLoad() {
    this.getHotRooms()
  },
  doEnterRoom(e) {
    this.joinRoom(e.mark.room_id);
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