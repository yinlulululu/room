// pages/orderDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.orderId)
    const db = wx.cloud.database()
    db.collection('order_list').doc(options.orderId).get().then(res => {
      // res.data 包含该记录的数据
      console.log(res)
      this.setData({
        detail: res.data
      })
    })

  },

  // 导航
  toMap() {
    wx.navigateTo({
      url: '/pages/map/index?data=' + JSON.stringify(this.data.detail)
    })
  },

  // 编辑
  edit() {
    console.log(this.data.detail)
    wx.navigateTo({
      url: '/pages/order/index?oid=1&data=' + JSON.stringify(this.data.detail)
    })
  },

  // 取消预约
  cancel() {
    wx.cloud.callFunction({
      name: 'deleteOrder',
      data: {
        orderid: this.data.detail._id
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '删除成功',
          icon: 'success'
        })
        wx.navigateTo({
          url: '/pages/myOrder/index'
        })
      },
      fail(err) {
        console.log(err)
        wx.showToast({
          title: '提交失败，请重试',
          icon: 'none'
        })
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