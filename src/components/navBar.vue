<template>
  <div>
    <div class="navBar" :style="{ height: navHeight }">
      <img
        :style="{
          height: imgHeight,
          width: imgHeight,
          top: imgTop,
          left: imgLeft,
        }"
        :src="Avatar"
      />
      <div :style="{ height: imgHeight, top: imgTop }">
        <p :style="{ lineHeight: imgHeight }">{{ name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: "小本子",
  },
  data() {
    return {
      Avatar: "",
      navHeight: "88px",
      imgHeight: "35px",
      imgTop: "44px",
      imgLeft: "26px",
      // textTop: this.globalData.textTop,
    };
  },
  methods: {
    //获取缓存用户信息
    getUserInfo() {
      const ui = wx.getStorageSync("ui");
      if (ui.openId) {
        this.Avatar = ui.avatarUrl;
      } else {
        this.Avatar = "/static/images/user.png";
      }
    },
  },
  onLoad() {
    this.getUserInfo();
  },
};
</script>

<style lang='scss'>
.navBar {
  border: 1px solid red;
  width: 100%;
  background-color: #f2f5f8;
  img {
    border:1px solid pink;
    position: absolute;
    border-radius: 50%;
  }
  div {
    border: 1px solid blue;
    position: absolute;
    width: 100%;
    text-align: center;
    p {
      font-family: PingFang SC;
    }
  }
  hr {
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.22);
  }
}
</style>
