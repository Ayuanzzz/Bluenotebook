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
  onLoad() {
    const ui = wx.getStorageSync("ui");
    this.Avatar = ui.avatarUrl;
  },
};
</script>

<style lang='scss'>
.navBar {
  width: 100%;
  background-color: #f2f5f8;
  position: fixed;
  top: 0;
  z-index: 1000;
  img {
    position: absolute;
    border-radius: 50%;
  }
  div {
    position: absolute;
    width: 100%;
    text-align: center;
    p {
      position: relative;
      font-family: PingFang SC;
      font-size: 16px;
      color: #000000;
      font-weight: normal;
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
