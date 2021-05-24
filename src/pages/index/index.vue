<template>
  <div>
       <button
      class="btn"
      open-type="getUserInfo"
      lang="zh_CN"
      @getuserinfo="onGotUserInfo"
    >
      体验一下
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    //登录
    onGotUserInfo: function (e) {
      const that = this;
      wx.cloud.callFunction({
        name: "login",
        success: (res) => {
          that.openId = res.result.openid;
          that.userInfo = e.target.userInfo;
          that.userInfo.openId = that.openId;
          wx.setStorageSync("ui", that.userInfo);
          wx.switchTab({
            url: "/pages/index/main",
          });
          console.log("云函数调用成功");
          console.log(that.userInfo);
        },
        fail: (err) => {
          console.error("[云函数] [login] 调用失败", err);
        },
      });
    },
  },
};
</script>

<style lang='scss'>
div {
  width: 100%;
  height: 500px;
}
button {
  height: 50px;
  display: block;
  margin-top: 200px;
}
</style>