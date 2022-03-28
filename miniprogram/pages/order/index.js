// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '', // 自习室名称
    time: '', // 营业时间
    date: '', // 预约时间
    address: '', // 地址
    latitude: '',
    longitude: '',
    img_src: '',
    showTime: false,
    showSeat: false,
    selected: false,
    seats: [], // 座位列表
    _id: '', // 自习室id
    click: true,
    sids: [],
    sid: '', // 座位id
    username: '', // 用户名
    phone: '' // 电话号码
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

  // 提交预约信息
  next() {
    if (!this.data.date || !this.data.sid || !this.data.username || !this.data.phone) {
      wx.showToast({
        title: '请完善预约信息',
        icon: 'error'
      })
    } else {
      const {
        username,
        phone,
        sid,
        date,
        _id,
        time,
        img_src,
        longitude,
        latitude,
        address,
        name
      } = this.data
      wx.cloud.callFunction({
        name: 'addOrder',
        data: {
          _openid: getApp().globalData.openid,
          order_time: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
          username,
          phone,
          sid,
          date,
          address_id: _id,
          time,
          img_src,
          longitude,
          latitude,
          address,
          name
        },
        success: res => {
          wx.showToast({
            title: '预约成功',
            icon: 'success'
          })
          const {
            orderid
          } = res.result
          wx.navigateTo({
            url: '/pages/orderDetail/index?orderId=' + orderid
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
      time,
      address,
      latitude,
      longitude,
      img_src
    } = detail
    this.setData({
      _id,
      name,
      time,
      address,
      latitude,
      longitude,
      img_src
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