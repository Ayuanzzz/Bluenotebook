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
      navHeight: this.globalData.navHeight,
      imgHeight: this.globalData.imgHeight,
      imgTop: this.globalData.imgTop,
      imgLeft: this.globalData.imgLeft,
      textTop: this.globalData.textTop,
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

<style>
.navBar {
  display: flex;
  justify-content: center;
  background-color: #f2f5f8;
}
.navBar img {
  position: absolute;
  border-radius: 50%;
}
.navBar div {
  position: absolute;
  display: flex;
  align-content: center;
}
.navBar div p {
  font-family: PingFang SC;
}
.navBar hr {
  height: 1px;
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.22);
}
</style>