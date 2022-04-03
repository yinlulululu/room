// pages/find/index.js
import * as echarts from '../../ec-canvas/echarts';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    formatter() {},
    ec_line: {
      lazyLoad: true, // 延迟加载
    },
    ec_pie: {
      lazyLoad: true, // 延迟加载
    },
    // 图表数据源
    addressList: [],
    dateList: [],
    pieList: [{
      value: 55,
      name: '已预约'
    }, {
      value: 20,
      name: '已取消'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.echartsLineComponnet = this.selectComponent('#mychart-dom-line');
    this.echartsPieComponnet = this.selectComponent('#mychart-dom-pie');
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
          this.init_echarts();
          const _addressList = []
          const _dateList = []
          const isOrderList = []
          const isCancelList = []
          res.data.forEach((item) => {
            _addressList.push(item.name)
            _dateList.push(item.date)
            if (item.order_status === '0') isOrderList.push(item)
            if (item.order_status === '1') isCancelList.push(item)
          })
          const _formatDateList = []
          _dateList.forEach((item) => {
            _formatDateList.push(Number(item.split('年')[1].split('月')[0]) + '/' + Number(item.split('年')[1].split('月')[1].split('日')[0]))
          })
          this.setData({
            orderList: res.data,
            addressList: _addressList,
            dateList: _formatDateList,
            pieList: [{
              name: '已预约',
              value: isOrderList.length
            }, {
              name: '已取消',
              value: isCancelList.length
            }]
          });
        }
      })
  },

  // 初始化echart
  init_echarts() {
    this.echartsLineComponnet.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(this.getLineOption());
      return Chart;
    });

    this.echartsPieComponnet.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(this.getPieOption());
      return Chart;
    });
  },

  // 折线图option
  getLineOption() {
    const that = this
    var option = {
      title: {
        text: '预约日期曲线图',
        left: 'center'
      },
      grid: {
        containLabel: true,
        left: 10
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: that.data.addressList,
        axisLabel: {
          interval: 0,
          rotate: "70"

        }
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'category',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
        // show: false
      },
      series: [{
        name: '预约日期',
        type: 'line',
        smooth: true,
        data: that.data.dateList
      }]
    };
    return option;
  },

  // 饼图option
  getPieOption() {
    const that = this
    var option = {
      tooltip: {
        trigger: 'item'
      },
      title: {
        text: '预约状态饼图',
        left: 'center'
      },
      backgroundColor: "#ffffff",
      series: [{
        label: {
          normal: {
            fontSize: 14
          }
        },
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['20%', '40%'],
        data: that.data.pieList
      }]
    };
    return option;
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