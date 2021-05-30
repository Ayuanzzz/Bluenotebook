import Vue from 'vue'
import App from './App'
// import './icon/iconfont.js'

Vue.config.productionTip = false
App.mpType = 'app'

wx.cloud.init({
  env: 'huhucloud-phuu5',
  traceUser: true
})

const app = new Vue(App)
app.$mount()
// 设置全局变量
getApp().globalData = {
  barHeight:'',
  cardTop:'',
  navHeight :'',
  navMargin:'',
  imgHeight:'',
  imgTop:'',
  imgLeft:'',
  id:'',
}
Vue.prototype.globalData = getApp().globalData
