<template>
  <div class="container" :style="{height:screenHeight}">
    <navBar></navBar>
  </div>
</template>

<script>
import navBar from '@/components/navBar';
export default {
    components:{
      navBar
    },
    data() {
        return {
          screenHeight:this.globalData.screenHeight
        }
    },
    methods: {
        //获取导航栏参数
        getNav() {
            let that = this;
            //获取按钮信息
            const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
            //获取用户手机信息
            const systemInfo = wx.getSystemInfoSync();
            that.globalData.screenHeight = systemInfo.screenHeight + "px";
            that.globalData.navHeight =
                (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 +
                menuButtonInfo.height +
                systemInfo.statusBarHeight +
                "px";
            that.globalData.imgHeight = menuButtonInfo.height + "px";
            that.globalData.imgTop = menuButtonInfo.top + "px";
            that.globalData.imgLeft = systemInfo.screenWidth - menuButtonInfo.right + "px";
        },
        
    },
    created(){
      this.getNav()
    },
    mounted() {
      console.log(this.screenHeight);
       
    }
}
</script>

<style>
.container{
  position: relative;
  background-color: #F2F5F8;
  width: 100%;
  height: 500px;
}
</style>
