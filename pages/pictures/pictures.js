// pages/pictures/pictures.js
const settings = require('../../settings.js');
const tools = require('../../tools.js');
let app = getApp();

var page = 1;
var page_size = 20;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    picList: [
      {
        id: '1',
        vip: '1',
        name: 'aaa',
        url: '/images/icons/wine.jpeg',
        brief: 'bbbb'
      },
      {
        id: '2',
        vip: '1',
        name: 'bbb',
        url: '/images/icons/wine.jpeg',
        brief: 'bbbb'
      },
      {
        id: '3',
        vip: '1',
        name: 'bbb',
        url: '/images/icons/wine.jpeg',
        brief: 'bbbb'
      },
      {
        id: '4',
        vip: '1',
        name: 'bbb',
        url: '/images/icons/wine.jpeg',
        brief: 'bbbb'
      }
    ],
    properties:[],
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
    type: '',
    style:'',
    houseType: '',
    acreage: '',
    color: '',
    popflag: true,
    pictureList:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log('onload');
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight-30
        });
      }
    });
  },
  checkClassify:function(data){
    var classify = app.globalData.classify;
    var format = app.globalData.format;
    var getProperties = this.data.getProperties;
    if (classify != null && format!= null){
      switch (format){
        case 'style':
          data[0].type = classify
          console.log(this.data.getProperties)
        this.setData({
          style: classify
        })
        break;
        case 'houseType':
          data[1].type = classify
          this.setData({
            houseType: classify
          })
          break;
        case 'acreage':
          data[2].type = classify
          this.setData({
            acreage: classify
          })
          break;
        case 'color':
          data[3].type = classify
          this.setData({
            color: classify
          })
          break;
      }
    }
    this.setData({
      getProperties:data
    })
    this.getPictureList02();
    app.globalData.classify = null;
    app.globalData.format = null;
  },
  //页面滑动到底部
  bindDownLoad: function () {
    var that = this;
    this.setData({
      hidden: false
    })
    this.getPictureList();
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
    //  this.setData({
    //    pictureList:[]
    //  })
    // this.setData({
    //   pictureList: [],
    //   scrollTop: 0,
    //   hidden:false
    // });
    // this.getPictureList();
    console.log("topLoad");
  },
  getProperty: function (e) {
    var that = this;
    app.apiFunctions.requestUrl(
      app.api.getProperty,
      'GET',
      true,
      false,
      '',
      function (data) {
        // that.setData({
        //   getProperties: data.data
        // })
        that.checkClassify(data.data);
        tools.todoEvent.trigger('getProperty');
      }
    );
  },
  getPictureList: function(e) {
    var that = this;
    var data = {
      page: page,
      pageSize: page_size,
      style: that.data.style,
      houseType: that.data.houseType,
      acreage: that.data.acreage,
      color: that.data.color
    }
    app.apiFunctions.requestUrl(
      app.api.getPictureList,
      'GET',
      true,
      false,
      data,
      function (data) {
        // console.log(data.data);
        var pictureList = that.data.pictureList;
        for (var i = 0; i < data.data.length; i++) {
          pictureList.push(data.data[i]);
        }
        that.setData({
          pictureList: pictureList
        });
        page++;
        that.setData({
          hidden: true
        });
        // that.setData({
        //   pictureList:data.data
        // })
      }
    );
  },
  getPictureList02: function (e) {
    page=1;
    var that = this;
    var data = {
      page: page,
      pageSize: page_size,
      style: that.data.style,
      houseType: that.data.houseType,
      acreage: that.data.acreage,
      color: that.data.color
    }
    app.apiFunctions.requestUrl(
      app.api.getPictureList,
      'GET',
      true,
      false,
      data,
      function (data) {
        // console.log(data.data);
        // var pictureList = that.data.pictureList;
        // for (var i = 0; i < data.data.length; i++) {
        //   pictureList.push(data.data[i]);
        // }
        // that.setData({
        //   pictureList: pictureList
        // });
        // page++;
        // that.setData({
        //   hidden: true
        // });
        that.setData({
          pictureList:data.data
        })
      }
    );
  },
  onTypeTap: function (e) {
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;
    var flag = !this.data.flag;
    var popflag = !this.data.popflag;
    var properties = this.data.getProperties[index].properties;
    this.setData({
      type: type,
      flag: flag,
      index: index,
      popflag: popflag,
      properties: properties,
    })
  },
  chooseProperty: function (index, subProperty){

    var getProperties = this.data.getProperties;
    getProperties[index].type = subProperty;
    this.setData({
      getProperties: getProperties
    })
  },
  onPropertyTap:function(e){  
    var subProperty = e.currentTarget.dataset.subproperty;
    // console.log(subProperty)
    var getProperties = this.data.getProperties;
    switch (this.data.index) {
      case 0:
        this.chooseProperty(this.data.index, subProperty);
        this.setData({
          style: subProperty,
          // houseType: '',
          // acreage: '',
          // color: '',
          popflag: true
        })
        break;
      case 1:
        this.chooseProperty(this.data.index, subProperty);
        this.setData({
          houseType: subProperty,
          // style: '',
          // acreage: '',
          // color: '',
          popflag: true
        })
        break;
      case 2:
        this.chooseProperty(this.data.index, subProperty);
        this.setData({
          acreage: subProperty,
          // style: '',
          // houseType: '',
          // color: '',
          popflag: true
        })
        break;
      case 3:
        this.chooseProperty(this.data.index, subProperty);
        this.setData({
          color: subProperty,
          // style: '',
          // houseType: '',
          // acreage: '',
          popflag: true
        })
        break;
      default:
        this.setData({
          popflag: true
        })
    }
    
    this.getPictureList02();
  },
  onNoneTap:function(e){
    var popflag = !this.data.popflag;
    var getProperties = this.data.getProperties;
    switch(this.data.index){
      case 0:
        getProperties[0].type='style'
       this.setData({
         style:'',
         getProperties: getProperties
       })
       break;
      case 1:
        getProperties[1].type = 'houseType'
        this.setData({
          houseType: '',
          getProperties: getProperties
        })
        break;
      case 2:
        getProperties[2].type = 'acreage'
        this.setData({
          acreage: '',
          getProperties: getProperties
        })
        break;
      case 3:
        getProperties[3].type = 'color'
        this.setData({
          color: '',
          getProperties: getProperties
        })
        break;
    }
    this.setData({
      popflag: popflag,
      flag:false
    })
    this.getPictureList02();
  },
  onPictureTap:function(e){

  },
  show: function () {
    this.setData({ popflag: false })
  },
  //消失
  hide: function () {
    this.setData({ popflag: true })

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
    this.getProperty();
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