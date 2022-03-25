// pages/map/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 0,
    latitude: 0,
    markers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const mapDetail = JSON.parse(decodeURIComponent(options.data))
    const {
      address,
      longitude,
      latitude
    } = mapDetail
    this.setData({
      longitude,
      latitude,
      markers: [{
        title: address,
        longitude,
        latitude,
      }]
    })
    // wx.getLocation({
    //   type: 'gcj02',
    //   altitude: true,
    //   //定位成功，更新定位结果      
    //   success: function (res) {
    //     console.log(res)
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     const speed = res.speed
    //     const accuracy = res.accuracy
    //     that.setData({
    //       longitude: 111.730071,
    //       latitude: 40.813598,
    //       markers: [{
    //         longitude: 111.730071,
    //         latitude: 40.813598,
    //         callout: {
    //           content: '图书馆',
    //           color: '#165DFF'
    //         }
    //       }]
    //     })
    //   }, //定位失败回调      
    //   fail: function () {
    //     wx.hideLoading();
    //     console.log("getLocationFail")
    //   },
    //   complete: function () {
    //     //隐藏定位中信息进度       
    //     wx.hideLoading()
    //   }
    // })
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