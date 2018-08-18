// pages/design/design.js
let app = getApp();
const tools = require('../../tools.js');
const provinceList = require('../../address.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseCity: '请选择您的所在城市',
    items: [
      { name: '1', value: '我已阅读并接受《装修常见问题条款》', checked: 'true' },
    ],
    showChapter: false,
    provinceList,
    cityList: [
    ],
    province: '北京市',
    city: '',
    "room": '',
    "hall": '',
    "kitchen": '',
    "bathRoom": '',
    "balcony": '',
    "acreage": '',
    "name": '',
    "phone": '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cities: this.data.provinceList[0].cities
    })
  },
  nameInput: function (e) {
    var name = e.detail.value;
    this.setData({
      name: name
    })
  },
  phoneInput: function (e) {
    var phone = e.detail.value;
    this.setData({
      phone: phone
    })
  },
  inputValidate: function (e) {
    if (this.data.name == '' || this.data.phone== '' || this.data.city == '') {
      wx.showToast({
        title: '信息不全',
      })
      return false;
    } else {
      return true;
    }
  },
  isValid() {
    return /\d{11}/.test(this.data.phone);
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    this.setData({
      agree: e.detail.value
    })
  },
  onChangeShowState: function () {
    console.log('onChangeShowState');
    let that = this;
    that.setData({
      showChapter: (!that.data.showChapter),
    })
  },
  onProvinceTap: function (e) {
    var province = e.currentTarget.dataset.province;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    this.setData({
      province: province,
      cities: this.data.provinceList[index].cities
    })
  },
  onCityTap: function (e) {
    var city = e.currentTarget.dataset.city;
    var chooseCity = e.currentTarget.dataset.choosecity;
    this.setData({
      city: city,
      chooseCity: chooseCity,
      showChapter: false
    })
  },
  commitDesign: function (e) {
    var that = this;
    if (that.inputValidate() && that.isValid()) {
      var data = {
        "room": that.data.room,
        "hall": that.data.hall,
        "kitchen": that.data.kitchen,
        "bathRoom": that.data.bathRoom,
        "balcony": that.data.balcony,
        "acreage": that.data.acreage,
        "province": that.data.province,
        "city": that.data.city,
        "name": that.data.name,
        "phone": that.data.phone,
        "type": 2
      }
      app.apiFunctions.requestUrl(
        app.api.design,
        'POST',
        true,
        false,
        data,
        function (data) {
          console.log(data);
          // wx.
          wx.showModal({
            title: '提示',
            content: '申请成功',
            success:function(res){
              if(res.confirm){
                wx.switchTab({
                  url: '../homepage/homepage',
                })
              }
            }
          })
        }
      );
    }

  },
  onCommitTap:function(e){
    this.commitDesign();
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