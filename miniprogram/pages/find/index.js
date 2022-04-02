// pages/find/index.js
import * as echarts from '../../ec-canvas/echarts';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    formatter() {},
    ec: {
      lazyLoad: true, // 延迟加载
    }
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

    this.echartsComponnet = this.selectComponent('#mychart-dom-line');
    this.getEchartsData(); //获取数据

  },

  // 获取echats 
  getEchartsData() {
    this.initChart()
  },

  initChart() {
    const that = this
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(that.getOption())
      // const chart = echarts.init(canvas, null, {
      //   width: width,
      //   height: height,
      //   devicePixelRatio: dpr // new
      // });
      // canvas.setChart(chart);

      // chart.setOption(option);
      return Chart;
    })
  },

  getOption() {
    var option = {
      title: {
        text: '测试下面legend的红色区域不应被裁剪',
        left: 'center'
      },
      legend: {
        data: ['A', 'B', 'C'],
        top: 50,
        left: 'center',
        backgroundColor: 'red',
        z: 100
      },
      grid: {
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
        // show: false
      },
      series: [{
        name: 'A',
        type: 'line',
        smooth: true,
        data: [18, 36, 65, 30, 78, 40, 33]
      }, {
        name: 'B',
        type: 'line',
        smooth: true,
        data: [12, 50, 51, 35, 70, 30, 20]
      }, {
        name: 'C',
        type: 'line',
        smooth: true,
        data: [10, 30, 31, 50, 40, 20, 10]
      }]
    }

    return option;
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