// pages/detailpicture/detailpicture.js
let app = getApp();
const tools = require('../../tools.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    previewImageArr: [],
    images: [
      {
        id: 1,
        name: 2,
        url: '/images/icons/1.jpeg'
      },
      {
        id: 2,
        name: 3,      
        url: 'http://damaizs.oss-cn-shenzhen.aliyuncs.com/file/1528163207307_db3a17f7bcac837ecc1fe2bc630a5473.jpg'
      },
      {
        id: 3,
        name: 4,
        url: 'http://damaizs.oss-cn-shenzhen.aliyuncs.com/file/1528163208241_edab7ba7e203cd7576d1200465194ea8.jpg'
      },
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var imagesId = options.imagesId;
    this.setData({
      imagesId: imagesId
    })
    this.getDetailImage();
  },
  imageLoad: function (e) {
    console.log(e)
    // var imageSize = this.imageUtil(e)
    // this.setData({
    //   imagewidth: imageSize.imageWidth,
    //   imageheight: imageSize.imageHeight
    // })
  },
  imageUtil: function (e) {
    var imageSize = {};
    var originalWidth = e.detail.width;//图片原始宽  
    var originalHeight = e.detail.height;//图片原始高  
    var originalScale = originalHeight / originalWidth;//图片高宽比  
    console.log('originalWidth: ' + originalWidth)
    console.log('originalHeight: ' + originalHeight)
    //获取屏幕宽高  
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
        var windowscale = windowHeight / windowWidth;//屏幕高宽比  
        console.log('windowWidth: ' + windowWidth)
        console.log('windowHeight: ' + windowHeight)
        if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比  
          //图片缩放后的宽为屏幕宽  
          imageSize.imageWidth = windowWidth;
          imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
        } else {//图片高宽比大于屏幕高宽比  
          //图片缩放后的高为屏幕高  
          imageSize.imageHeight = windowHeight;
          imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
        }

      }
    })
    console.log('缩放后的宽: ' + imageSize.imageWidth)
    console.log('缩放后的高: ' + imageSize.imageHeight)
    return imageSize;
  },
  changePreview(e) {
    console.log(e.currentTarget.dataset.src);
    var self = this;
    let imgList = [];
    self.data.imageList.images.forEach(img => {
      imgList.push(img.url);
    });
    this.setData({
      imgList: imgList
    })
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: self.data.imgList
    })
  },
  getImageInfo:function(e){
    var url = e.currentTarget.dataset.url
    wx.getImageInfo({
      src: url,
      success: function (res) {
        console.log(res.width)
        console.log(res.height)
      }
    })
  },
  getDetailImage: function (e) {
    var that = this;
    var url = `${app.api.detail}` + '/' + `${this.data.imagesId}`
    app.apiFunctions.requestUrl(
      url,
      'GET',
      true,
      false,
      '',
      function (data) {
        console.log(data);
        that.setData({
          imageList:data.data
        })
      }
    );
  },
  onBtnTap:function(e){
    wx.navigateTo({
      url: '../quotation/quotation',
    })
  },
  bindchange:function(e){
    // console.log('bindchange事件', `this.data.index:${this.data.index} e.detail.current:${e.detail.current}`)
    console.log(e.detail.current);
    this.setData({
      index: e.detail.current
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
  onShow: function () {
  
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