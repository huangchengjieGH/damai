// pages/homepage/homepage.js
let app = getApp();
const tools = require('../../tools.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [
      {
        id: '1',
        name: 'test',
        url: 'http://damaizs.oss-cn-shenzhen.aliyuncs.com/file/1528530806940_d86955baaa4970454a20626268642e6d.jpeg'
      },
      {
        id: '2',
        name: 'test',
        url: 'http://damaizs.oss-cn-shenzhen.aliyuncs.com/file/1528531070929_f3ccdd27d2000e3f9255a7e3e2c48800.jpg'
      },
      {
        id: '3',
        name: 'test',
        url: 'http://damaizs.oss-cn-shenzhen.aliyuncs.com/file/1528541887941_156005c5baf40ff51a327f1c34f2975b.jpg'
      }
    ],
    columnStatus: [
      {
        id: 0,
        name: '按面积'
      },
      {
        id: 1,
        name: '按风格'
      },
      {
        id: 2,
        name: '按户型'
      },

    ],
    imgList: [
      {
        id: '1',
        name: 'test',
        url: '/images/icons/1.jpg'
      },
      {
        id: '2',
        name: 'test',
        url: '/images/icons/2.jpg'
      },
      {
        id: '3',
        name: 'test',
        url: '/images/icons/1.jpg'
      }
    ],
    status: 'style',


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDrawer();
  },
  getDrawer: function (e) {
    var that = this;
    app.apiFunctions.requestUrl(
      app.api.getDrawer,
      'GET',
      true,
      false,
      '',
      function (data) {
        console.log(data);
        that.setData({
          drawList: data.data,
          imgList: data.data[0]
        })
      }
    );
  },
  getImageList: function (data) {
    var drawList = this.data.drawList;
    for (var idx in drawList) {
      if (drawList[idx].type == data) {
        // this.data.imgList = drawList[idx];
        this.setData({
          imgList: drawList[idx]
        })
        break;
      }
    }
  },
  onTypeTap: function (e) {
    var status = e.currentTarget.dataset.status;
    this.getImageList(status);
    this.setData({
      status: status
    })
  },
  onShow: function () {
    // var that =this;
    // app.tools.todoEvent.listen('customerInfo', that.handlerCustomerInfo);
  },
  hide: function () {
    this.setData({ logout: true })
  },
  onHotlineTap: function (e) {
    wx.makePhoneCall({
      phoneNumber: '18924193359' //仅为示例，并非真实的电话号码
    })
  },
  onMoreTap: function (e) {
    wx.switchTab({
      url: '../pictures/pictures',
    })
  },
  onPictureTap: function (e) {
    var classify = e.currentTarget.dataset.classify;
    console.log(classify);
    app.globalData.classify = classify;
    app.globalData.format = this.data.status;

    wx.switchTab({
      url: '../pictures/pictures'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */


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

  }
})