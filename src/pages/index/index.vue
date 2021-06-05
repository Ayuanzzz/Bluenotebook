<template>
  <div>
    <div class="mask">
      <!-- <span v-for="(item, index) in textArr"
          :key="index" :style={top:top}> {{ item }} </span> -->
      <div class="text" :style="{ top: top }">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>6</span>
        <span>7</span>
      </div>
    </div>
    <button
      class="btn"
      open-type="getUserInfo"
      lang="zh_CN"
      @getuserinfo="onGotUserInfo"
    >
      体验一下
    </button>
    <button @click="test()">data</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textArr: [
        "今天，和小伙伴过的怎样",
        "开心",
        "失落",
        "想要记一笔？",
        "这",
        "就是你的",
        "小本子",
      ],
      top: "30px",
      index: 30,
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
    //遍历text
    showText() {
      console.log("showText");
      const that = this;
      let i = 0;
      setInterval(() => {
        if (i < that.textArr.length - 1) {
          that.text1 = that.textArr[i];
          that.text2 = that.textArr[i + 1];
          console.log(that.text1);
          console.log(that.text2);
          console.log(i);
          i++;
        }
      }, 2000);
    },
    test() {
      let timer = setInterval(() => {
        this.index = this.index - 10;
        this.top = this.index + "px";
        console.log(this.top);
        console.log(this.index + "----index");
        if (this.index < -50) {
          clearInterval(timer);
        }
      }, 2000);
    },
  },
  onLoad(){
    this.oldUser()
  },
  onShow() {
    console.log("show");
    this.test()
  },
};
</script>

<style lang='scss'>
div {
  width: 100%;
  height: 100%;
}
button {
  bottom: 20px;
  height: 50px;
  display: block;
  margin-top: 200px;
}
.mask {
  top: 100px;
  left: 100px;
  height: 30px;
  position: relative;
  border: 1px solid red;
  overflow: hidden;
  .text {
    position: absolute;
    transition: top 0.5s ease-in-out;
  }
  span {
    display: block;
  }
  // span:nth-child(1) {
  //   transition: top 0.5s ease-in-out;
  // }
  // span:nth-child(2) {
  //   top: 60px;
  // }
  .data-show {
    animation: move1 0.5s;
  }
  .data-up {
    transform: translateY(-200%);
    transition: transform 2s ease-in-out;
  }
}
</style>
