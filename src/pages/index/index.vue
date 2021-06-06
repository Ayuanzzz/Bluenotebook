<template>
  <div>
    <div class="wrap">
      <p :class="textStyle">{{ text }}</p>
    </div>

    <div class="btn">
      <button
        class="btn"
        open-type="getUserInfo"
        lang="zh_CN"
        @getuserinfo="onGotUserInfo"
        v-if="show"
      >
        玩一下
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      textArr: [
        "今天，和小伙伴过的怎样",
        "开心",
        "失落",
        "在这里记一笔吧",
        "小本子",
      ],
      text: "",
      textStyle: "",
    };
  },
  methods: {
    //判断新老用户
    oldUser() {
      let ui = wx.getStorageSync("ui");
      if (ui.openId) {
        wx.switchTab({
          url: "/pages/dude/main",
        });
      }
    },
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
          wx.navigateTo({
            url: "/pages/create/main",
          });
          console.log("云函数调用成功");
          console.log(that.userInfo);
        },
        fail: (err) => {
          console.error("[云函数] [login] 调用失败", err);
        },
      });
    },
    changeWords() {
      let i = 0;
      setInterval(() => {
        if (i < 5) {
          this.text = this.textArr[i];
          this.textStyle = "textStyle-" + i;
          i++;
        } else {
          this.show = true;
        }
      }, 2000);
    },
  },
  onLoad() {
    this.oldUser();
  },
  onShow() {
    this.changeWords();
  },
};
</script>

<style lang='scss'>
div {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
.btn {
  position: absolute;
  bottom: 50px;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  button {
  height: 45px;
  width: 300px;
  background-color: #4378db;
  border-radius: 30px;
  font-size: 18px;
  font-family: PingFang SC;
  line-height: 45px;
  letter-spacing: 1px;
  color: #ffffff;
  text-align: center;
}
}

.wrap {
  position: absolute;
  top: 40%;
  width: 100%;
  p {
    display: block;
    font-family: PingFang SC;
    font-weight: bold;
    font-size: 30px;
    text-align: center;
    color: transparent;
  }
  .textStyle-0 {
    background: linear-gradient(45deg, #0ecffe 50%, #07a6f1);
    background-clip: text;
    -webkit-background-clip: text;
    font-size: 25px;
  }
  .textStyle-1 {
    background: linear-gradient(45deg, #fa7671 50%, #f45f7f);
    background-clip: text;
    -webkit-background-clip: text;
    font-size: 45px;
  }
  .textStyle-2 {
    background: linear-gradient(45deg, #18e198 50%, #0ec15d);
    background-clip: text;
    -webkit-background-clip: text;
    font-size: 35px;
  }
  .textStyle-3 {
    background: linear-gradient(45deg, #8a7cfb 50%, #633e9c);
    background-clip: text;
    -webkit-background-clip: text;
    font-size: 40px;
  }
  .textStyle-4 {
    background: linear-gradient(45deg, #4e7fda 50%, #4378db);
    background-clip: text;
    -webkit-background-clip: text;
    font-size: 35px;
  }
}
</style>
