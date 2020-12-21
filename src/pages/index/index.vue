<template>
  <div>
    <!-- 加载动画 -->
    <loader v-if="showLoader"></loader>
  </div>
</template>

<script>
import loader from "@/components/loader";
export default {
  components:{
    loader,
  },
  data(){
    return{
      showLoader:true
    }
  },
  methods: {
    oldUser() {
      this.ui = wx.getStorageSync("ui");
      if (!this.ui.openId) {
        this.showLoader = false;
        wx.navigateTo({
          url: "/pages/loginone/main",
        });
      } else {
        this.showLoader = false;
        wx.navigateTo({
          url: "/pages/me/main",
        });
        console.log("老用户open");
      }
    },
  },
  created() {
    this.oldUser();
  },
};
</script>

<style>
</style>