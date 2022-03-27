// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    time: '',
    date: '',
    showTime: false,
    showSeat: false,
    selected: false,
    seats: [],
    _id: '',
    click: true,
    sids: [],
    username: '',
    phone: ''
  },

  // 展示座位
  handleSelect(e) {
    console.log(e)
    const _this = this
    for (let i = 0; i < _this.data.seats.length; i++) {
      if (e.currentTarget.dataset.sid == _this.data.seats[i].sid) {
        let item = "seats[" + i + "].selected";
        let {
          sids
        } = _this.data;
        if (_this.data.seats[i].selected === '0') {
          sids.push(e.currentTarget.dataset.sid)
          _this.setData({
            [item]: '1',
            sids: sids

          })
        } else {
          sids = sids.filter((x) => x !== e.currentTarget.dataset.sid)
          _this.setData({
            [item]: '0',
            sids: sids
          })
        }
      }
    }

  },

  // 展示日历
  onDisplay() {
    this.setData({
      showTime: true
    });
  },

  // 展示座位
  onDisplaySeat() {
    this.setData({
      showSeat: true
    });
  },

  // 关闭座位
  onCloseSeat() {
    this.setData({
      showSeat: false
    });
  },

  // 确定座位
  onOkSeat() {
    // 过滤选择的sid
    if (this.data.sids.length !== 1) {
      wx.showToast({
        title: '只能预约一位',
        icon: 'error'
      })
    } else {
      this.setData({
        sid: this.data.sids[0],
        showSeat: false
      });
    }

  },

  // 关闭日历
  onClose() {
    this.setData({
      showTime: false
    });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  },
  onConfirm(event) {
    this.setData({
      showTime: false,
      date: this.formatDate(event.detail),
    });
  },

  next() {

    if (!this.data.date || !this.data.sid || !this.data.username || !this.data.phone) {
      wx.showToast({
        title: '请完善预约信息',
        icon: 'error'
      })
    } else {
      console.log(this.data.username, this.data.phone, this.data.date, this.data.sid)
    }
  },

  //获取数据
  getSeatsList() {
    wx.showLoading({
      title: '加载中...',
    })
    const db = wx.cloud.database()
    db.collection('address_list').where({
        _id: this.data._id,
      })
      .get({
        success: res => {
          console.log(res)
          wx.hideLoading()
          this.setData({
            seats: res.data[0].seat
          });
        }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const detail = await JSON.parse(decodeURIComponent(options.data))
    const {
      _id,
      name,
      time
    } = detail
    this.setData({
      _id,
      name,
      time
    })
    this.getSeatsList()
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