// pages/find/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    formatter() {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const that = this
    await this.getMyOrderList()
    this.setData({
      formatter(day) {
        const month = day.date.getMonth() + 1;
        const date = day.date.getDate();
        that.data.orderList.forEach((item) => {
          const _month = Number(item.date.split('年')[1].split('月')[0])
          const _day = Number(item.date.split('年')[1].split('月')[1].split('日')[0])
          if (month === _month) {
            if (date === _day) {
              // day.text = item.name
              day.bottomInfo = item.name;
              day.topInfo = `${item.sid}号位`
              day.className = 'order_day'
            }
          }
        })


        return day;
      }
    })
  },

  //获取数据
  getMyOrderList() {
    wx.showLoading({
      title: '加载中...',
    })
    const db = wx.cloud.database()
    db.collection('order_list').where({
        _openid: getApp().globalData.openid
      })
      .get({
        success: res => {
          wx.hideLoading()
          this.setData({
            orderList: res.data,
          });
        }
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