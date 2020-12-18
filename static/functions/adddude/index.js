// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    db.collection('demo2').add({
      data:{
        openId:event.openId,
        name:event.name,
        startTime:event.startTime,
        startDays:event.startDays,
        allSeconds:event.allSeconds,
        status:event.status,
        love:event.love,
        hate:event.hate
      }
    })
}