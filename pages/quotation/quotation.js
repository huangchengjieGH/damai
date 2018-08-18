// pages/quotation/quotation.js
const tools = require('../../tools.js');
let app = getApp();
const provinceList = require('../../address.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showChapter: false,
    chooseCity:'请选择您的所在城市',
    provinceList,
    cityList: [
    ],
    multiArray: [['1室', '2室', '3室', '4室', '5室', '6室'], ['1厅', '2厅', '3厅', '4厅', '5厅', '6厅'], ['1厨', '2厨', '3厨', '4厨', '5厨', '6厨'], ['1卫', '2卫', '3卫', '4卫', '5卫', '6卫'], ['1阳台', '2阳台', '3阳台', '4阳台', '5阳台', '6阳台']],
    multiIndex: [0, 0, 0,0,0],
    province:'北京市',
    city:'',
    room: 1,
    hall: 1,
    kitchen: 1,
    bathRoom: 1,
    balcony: 1,
    name:'',
    acreage:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     cities: this.data.provinceList[0].cities
   })
  },
  onChangeShowState: function () {
    console.log('onChangeShowState');
    let that = this;
    that.setData({
      showChapter: (!that.data.showChapter),
    })
  },
  onProvinceTap:function(e){
    var province = e.currentTarget.dataset.province;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    this.setData({
      province: province,
      cities: this.data.provinceList[index].cities
    })
  },
  onCityTap:function(e){
    var city = e.currentTarget.dataset.city;
    var chooseCity = e.currentTarget.dataset.choosecity;
    this.setData({
      city: city,
      chooseCity: chooseCity,
      showChapter:false
    })
  },
  houseAreaInput:function(e){
    var acreage = e.detail.value;
    this.setData({
      acreage: acreage
    })
  },
  bindMultiPickerColumnChange: function (e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        this.setData({
          room: data.multiIndex[0]+1
        })    
        break;
      case 1:
        this.setData({
          hall: data.multiIndex[1] + 1
        })
      case 2:
        this.setData({
          kitchen: data.multiIndex[2] + 1
        })
        break;
      case 3:
        this.setData({
          bathRoom: data.multiIndex[3] + 1
        })
        break;
      case 4:
        this.setData({
          balcony: data.multiIndex[4] + 1
        })
        break;
    }
    this.setData(data);
  },
  phoneInput:function(e){
    var phone = e.detail.value;
    this.setData({
      phone: phone
    })
  },
  inputValidate: function (e) {
    if (this.data.province == '' || this.data.city == '' || this.data.acreage == '' || this.data.phone == '') {
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
  commitQuotation: function (e) {
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
        "type": 1
      }
      app.apiFunctions.requestUrl(
        app.api.quotation,
        'POST',
        true,
        false,
        data,
        function (data) {
          console.log(data);
          that.setData({
            price:data.data
          })
          let str = JSON.stringify(data.data);
          console.log(str);
          wx.navigateTo({
            url: '../result/result?price=' + str,
          })
        }
      );
    }

  },
  onCommitTap:function(e){
    this.commitQuotation();
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