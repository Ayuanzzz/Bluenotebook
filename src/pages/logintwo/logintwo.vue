<template>
  <div class="container">
    <div class="wrap">
      <div class="title">
        <p>hello</p>
      </div>
      <div class="profile">
        <img :src="avatar" />
      </div>
      <div class="btn">
        <p @click="navTo">添加小伙伴</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      avatar:''
    }
  },
  methods:{
    getUi(){
      this.avatar = wx.getStorageSync('ui').avatarUrl
      console.log(this.avatar);
    },
    navTo(){
      wx.navigateTo({
            url: "/pages/dude/main",
          });
    }
  },
  onLoad(){
    this.getUi()
  }
};
</script>

<style>
.container {
  background-color: #f2f5f8;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap {
  width: 212px;
  height: 479px;
  position: relative;
  display: flex;
  justify-content: center;
}
.title {
  position: absolute;
  top: 0px;
}
.title p {
  font-family: Abadi MT Condensed Extra Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 72px;
  line-height: 83px;
  text-align: center;
  color: #4378db;
}
.profile{
  position: absolute;
  top: 154px;
}
.profile img {
  width: 141px;
  height: 141px;
  border-radius: 50%;
}
.btn {
  position: absolute;
  width: 212px;
  height: 45px;
  bottom: 0px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
}

.btn p {
  font-family: PingFang HK;
  font-weight: bold;
  font-size: 23px;
  line-height: 45px;
  color: #4378db;
  text-align: center;
}
</style>