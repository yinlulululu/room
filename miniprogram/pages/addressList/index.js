// miniprogram/pages/sizeList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    category_id: "1",
    page: 1,
    addressList: [],
  },

  //点击切换 
  clickTab: function (e) {
    this.setData({
      addressList: [],
      category_id: e.detail.name
    });
    this.getAddressList()
  },

  //获取数据
  getAddressList() {
    wx.showLoading({
      title: '加载中...',
    })
    const db = wx.cloud.database()
    db.collection('address_list').where({
        category_id: this.data.category_id,
      })
      .get({
        success: res => {
          wx.hideLoading()
          this.setData({
            addressList: res.data
          });
        }
      })
  },

  // 去预约
  goNextPage(e) {
    wx.navigateTo({
      url: '/pages/preEdit/index?index=' + e.currentTarget.dataset.index + '&data=' + JSON.stringify(this.data.photoSizeList[e.currentTarget.dataset.index])
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddressList()
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