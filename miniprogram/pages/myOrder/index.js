// pages/myOrder/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myOrderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyOrderList()
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
          console.log(res);
          wx.hideLoading()
          this.setData({
            myOrderList: res.data,
          });
        }
      })
  },

  // 去预约详情
  toDetail(e) {
    wx.navigateTo({
      url: '/pages/orderDetail/index?orderId=' + e.currentTarget.dataset.id
    })
  },

  // 编辑活动
  edit(e) {
    console.log(e.currentTarget.dataset.id)
  },

  // 删除活动
  remove(e) {
    console.log(e.currentTarget.dataset.id)

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