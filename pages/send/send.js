// pages/send/send.js
const tools = require('../../tools.js');
let app = getApp();
var page = 1;
var page_size = 20;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    orderList: [],
    scrollTop: 0,
    scrollHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //   这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  //页面滑动到底部
  bindDownLoad: function () {
    var that = this;
    this.setData({
      hidden: false
    })
    this.getOrderList();
    console.log("bindDownLoad");
  },
  scroll: function (event) {
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  topLoad: function (event) {
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    //  page = 1;
    // this.setData({
    //   orderList: [],
    //   scrollTop: 0,
    //   hidden:false
    // });
    // this.getOrderList();
    console.log("topLoad");
  },
  getOrderList: function (e) {
    var that = this;
    var data = {
      page: page,
      pageSize: page_size,
      province: '',
      city: '',
      room: ''
    }
    app.apiFunctions.requestUrl(
      app.api.send,
      'GET',
      true,
      true,
      data,
      function (data) {
        console.log(data);

        var orderList = that.data.orderList;
        for (var i = 0; i < data.data.length; i++) {
          orderList.push(data.data[i]);
        }
        that.setData({
          orderList: orderList
        });
        page++;
        that.setData({
          hidden: true
        });
        console.log(page);
        // that.setData({
        //   orderList:data.data
        // })
      }
    );
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    page = 1;
    this.getOrderList();
  },

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