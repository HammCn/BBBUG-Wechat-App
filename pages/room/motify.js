const app = getApp();
Page({
  data: {
    roomInfo: false,
    room_type: 0,
    roomType: [{
      id: 0,
      name: "普通聊天房"
    }, {
      id: 1,
      name: "点歌音乐房"
    }, {
      id: 4,
      name: "房主电台房"
    }],
    room_addsong: [{
      value: 0,
      title: "所有人可点歌"
    }, {
      value: 1,
      title: "仅房主可点歌"
    }],
    room_sendmsg: [{
      value: 0,
      title: "关闭全员禁言"
    }, {
      value: 1,
      title: "开启全员禁言"
    }],
    room_public: [{
      value: 0,
      title: "公开房间"
    }, {
      value: 1,
      title: "加密房间"
    }],
    room_robot: [{
      value: 0,
      title: "开启机器人点歌"
    }, {
      value: 1,
      title: "关闭机器人点歌"
    }],
    room_playone: [{
      value: 0,
      title: "随机播放"
    }, {
      value: 1,
      title: "单曲循环"
    }],
    room_votepass: [{
      value: 0,
      title: "关闭投票切歌"
    }, {
      value: 1,
      title: "打开投票切歌"
    }],
    room_votepercent: [{
      value: 20,
      title: "20%"
    }, {
      value: 30,
      title: "30%"
    }, {
      value: 40,
      title: "40%"
    }, {
      value: 50,
      title: "50%"
    }, {
      value: 60,
      title: "60%"
    }, ],
  },
  onLoad: function (options) {},
  onShow: function () {
    let room_type = 0;
    switch (app.globalData.roomInfo.room_type) {
      case 1:
        room_type = 1;
        break;
      case 4:
        room_type = 2;
        break;
      default:
    }
    this.setData({
      roomInfo: app.globalData.roomInfo,
      room_type: room_type
    });
  },
  changeType() {
    let that = this;
    let menu = [];
    for (let i = 0; i < that.data.roomType.length; i++) {
      menu.push(that.data.roomType[i].name);
    }
    wx.showActionSheet({
      itemList: menu,
      success(res) {
        that.setData({
          room_type: res.tapIndex
        });
      }
    })
  },
  doSubmit(e) {
    let that = this;
    let roomInfo = e.detail.value;
    roomInfo.room_type = 0;
    switch (that.data.room_type) {
      case 1:
        roomInfo.room_type = 1;
        break;
      case 2:
        roomInfo.room_type = 4;
        break;
      default:
    }
    roomInfo.room_id = that.data.roomInfo.room_id;
    app.request({
      url: "room/saveMyRoom",
      data: roomInfo,
      success(res) {
        wx.showToast({
          title: '修改成功',
        });
      }
    });
  },
})