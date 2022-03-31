// pages/orderDetail/index.js
import QRCode from '../../utils/qrcode'

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
  onLoad: async function (options) {
    const db = wx.cloud.database()
    await db.collection('order_list').doc(options.orderId).get().then(res => {
      // res.data 包含该记录的数据
      console.log(res)
      this.setData({
        detail: res.data
      })
    })
    const newcode = new QRCode('myQrcode', {
      text: JSON.stringify(this.data.detail),
      width: 200,
      height: 200,
      // colorDark: "#ffffff",
      // colorLight: "white",
      // padding: 12, // 生成二维码四周自动留边宽度，不传入默认为0
      correctLevel: QRCode.CorrectLevel.Q, // 二维码可辨识度
      callback: (res) => {
        console.log(res.path)
        // 接下来就可以直接调用微信小程序的api保存到本地或者将这张二维码直接画在海报上面去，看各自需求
      }
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
      name: 'cancelOrder',
      data: {
        orderid: this.data.detail._id
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '取消成功',
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

  // 添加到日历
  addCalender() {
    console.log(this.data.detail.date)
    const {
      name,
      date,
      address
    } = this.data.detail
    const dateStr = date.replace(/\月|日|年/g, '/')
    const _date = dateStr.substr(0, dateStr.length - 1)

    wx.addPhoneCalendar({
      title: name,
      startTime: new Date(_date).getTime(),
      location: address,
      allDay: true,
      alarm: true,
      success: (res) => {
        console.log(res)
      },
      fail: (reject) => {
        wx.showToast({
          title: reject,
          icon: 'error'
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
    newcode = null
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