// pages/find/index.js
import * as echarts from '../../ec-canvas/echarts';

function initLineChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

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
      data: ['博学楼自习室', '勤学楼自习室', '南教自习室', '生科楼自习室', '东主自习室'],
      axisLabel: {
        interval: 0
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
      data: ['1/22', '1/03', '12/21', '2/22', '07/s21']
    }]
  };
  chart.setOption(option);
  return chart;
}

function initPieChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

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
      data: [{
        value: 55,
        name: '已预约'
      }, {
        value: 20,
        name: '已取消'
      }]
    }]
  };

  chart.setOption(option);
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    formatter() {},
    ec_line: {
      onInit: initLineChart
    },
    ec_pie: {
      onInit: initPieChart
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