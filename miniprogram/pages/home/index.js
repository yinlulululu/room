// pages/home/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //轮播图配置
        autoplay: true,
        interval: 3000,
        duration: 1200,
        detail: {},
        total: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // const data = {
        //     "swiperDatas": [{
        //         "id": 3,
        //         "imgurl": "cloud://yinlu-3bit0.7969-yinlu-3bit0-1302890904/room/home/5.png"
        //     }]
        // };
        // this.setData({
        //     swiperDatas: data.swiperDatas
        // })
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
                        detail: res.data[0],
                        total: res.data.length
                    });
                }
            })
    },

    // 路由跳转
    navigateTo(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.url,
        })
    },

    // 去预约
    toOrder(e) {
        wx.navigateTo({
            url: '/pages/order/index?data=' + JSON.stringify(this.data.detail)
        })
    },

    // 导航
    toMap(e) {
        wx.navigateTo({
            url: '/pages/map/index?data=' + JSON.stringify(this.data.detail)
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