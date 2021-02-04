const app = getApp();
Page({
  data: {
    userInfo: false,
    user_head: "",
    user_sex: 0,
    sexList: [{
      id: 0,
      name: "女生"
    }, {
      id: 1,
      name: "男生"
    }]
  },
  onLoad: function (options) {},
  onShow: function () {
    this.getMyInfo();
  },
  changeSex() {
    let that = this;
    wx.showActionSheet({
      itemList: ['女生', '男生'],
      success(res) {
        that.setData({
          user_sex: res.tapIndex
        });
      }
    })
  },
  chooseImage() {
    let that = this;
    let menu = ['查看大图', '上传头像'];
    wx.showActionSheet({
      itemList: menu,
      success(res) {
        switch (menu[res.tapIndex]) {
          case '查看大图':
            if (that.data.userInfo) {
              wx.previewImage({
                current: that.data.userInfo.user_head,
                urls: [that.data.userInfo.user_head],
              });
            }
            break;
          case '上传头像':
            console.log(123);
            wx.chooseImage({
              count: 1,
              sizeType: 'compressed',
              // sourceType: 'album',
              success(res) {
                wx.showLoading({
                  title: '上传中',
                });
                wx.uploadFile({
                  url: app.globalData.request.apiUrl + "attach/uploadHead",
                  filePath: res.tempFilePaths[0],
                  name: 'file',
                  formData: Object.assign({}, app.globalData.request.baseData),
                  success(res) {
                    wx.hideLoading();
                    res.data = JSON.parse(res.data);
                    if (res.data.code == 200) {
                      that.setData({
                        user_head: app.globalData.request.cdnUrl + "/uploads/" + res.data.data.attach_path
                      });
                    } else {
                      wx.showModal({
                        title: "上传失败(" + res.data.code + ")",
                        content: res.data.msg,
                        showCancel: false
                      });
                    }
                  },
                })
              },
            })
            break;
          default:
        }
      }
    })
  },
  logout() {
    wx.showModal({
      title: "退出登录",
      content: "确认退出当前登录的帐号吗？",
      confirmText: "退出",
      confirmColor: "#f00",
      success(res) {
        if (res.confirm) {
          app.globalData.userInfo = app.globalData.guestUserInfo;
          app.globalData.request.baseData.access_token = app.globalData.guestUserInfo.access_token;
          wx.setStorageSync('access_token', app.globalData.guestUserInfo.access_token);
          wx.reLaunch({
            url: '../index/index',
          });
        }
      }
    })
  },
  doSubmit(e) {
    let that = this;
    let userInfo = e.detail.value;
    userInfo.user_head = that.data.user_head;
    userInfo.user_sex = that.data.user_sex;
    app.request({
      url: "user/updateMyInfo",
      data: userInfo,
      success(res) {
        const eventChannel = that.getOpenerEventChannel();
        eventChannel.emit('myInfoChanged');
        wx.navigateBack();
      }
    });
  },
  getMyInfo() {
    let that = this;
    app.request({
      url: "user/getmyinfo",
      success(res) {
        res.data.user_name = decodeURIComponent(res.data.user_name);
        that.setData({
          userInfo: res.data,
          user_sex: res.data.user_sex,
          user_head: res.data.user_head,
        });
      }
    });
  },
})