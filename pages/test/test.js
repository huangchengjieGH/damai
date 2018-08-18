// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // imagefirstsrc: 'http://bpic.588ku.com/back_pic/00/03/85/1656205138bbe2d.png',//图片链接  
    imagefirstsrc: 'http://damaizs.oss-cn-shenzhen.aliyuncs.com/file/1528163207307_db3a17f7bcac837ecc1fe2bc630a5473.jpg',
    imagesecondsrc: 'http://bpic.588ku.com/back_pic/04/07/63/28581203949ca9d.jpg!/fw/400/quality/90/unsharp/true/compress/true',//图片链接  
    imagethirdsrc: 'http://img1.gtimg.com/ent/pics/hv1/13/71/2061/134034643.jpg',
    imagewidth: 0,//缩放后的宽  
    imageheight: 0,//缩放后的高  
    images: [
      {
        id: 1,
        name: 2,
        url: '/images/icons/test.jpeg'
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');
    // this.setData({
    //   image: this.data.images[1]
    // })

  },
  imageLoad: function (e) {
    var imageSize = this.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  } ,
  imageUtil:function(e) {  
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
  }  ,
  // handletouchmove: function (event) {
  //   console.log(event)
  // },
  // handletouchmove: function (event) {
  //   console.log(event)
  // },
  //
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