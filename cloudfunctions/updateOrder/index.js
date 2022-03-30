// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  let orderid = event.orderid
  const res = await db.collection('order_list').doc(event.orderid).update({
    data: {
      username: event.username,
      date: event.date,
      phone: event.phone,
      sid: event.sid
    }
  })

  return {
    res,
    orderid,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}