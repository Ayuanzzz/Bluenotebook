<template>
  <div class="container" style="{margin-top:navTop}">
    <div class="title">
      <p class="big">小本子</p>
    </div>
    <div class="dude">
      <div class="wawa">
        <img src="/static/images/wawa.png" />
      </div>
      <div class="peter">
        <img src="/static/images/Peter.png" />
      </div>
      <div class="vanessa">
        <img src="/static/images/Vanessa.png" />
      </div>
      <div class="jonathan">
        <img src="/static/images/Jonathan.png" />
      </div>
    </div>
    <p>在这里，你可以创建好友</p>
    <img class="phone" src="cloud://huhucloud-phuu5.6875-huhucloud-phuu5-1302876511/1.jpg" />
    <p>记录开心或难过的次数</p>
    <img class="phone" src="cloud://huhucloud-phuu5.6875-huhucloud-phuu5-1302876511/2.jpg" />
    <p>最多可创建四位好友</p>
    <img class="phone" src="cloud://huhucloud-phuu5.6875-huhucloud-phuu5-1302876511/3.jpg" />
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
  data() {
    return {
      navTop:this.globalData.navHeight
    };
  },
  methods: {
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
            url: "/pages/logintwo/main",
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

<style>
.container {
  position: relative;
  margin-top: 80px;
  margin-bottom: 30px;
  width: 100%;
  height: 1748px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.title {
  width: 269px;
  height: 55px;
  color: rgba(67, 120, 219, 1);
  position: relative;
}

.title .big {
  position: absolute;
  left: 0;
  font-family: Abadi MT Condensed Extra Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 55px;
  letter-spacing: 7px;
}

.dude {
  width: 269px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.dude div {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dude img {
  width: 32px;
  height: 32px;
}

.dude .wawa {
  background-color: rgba(40, 161, 100, 0.3);
}
.dude .peter {
  background-color: rgba(67, 120, 219, 0.3);
}
.dude .jonathan {
  background-color: rgba(253, 205, 85, 0.4);
}
.dude .vanessa {
  background-color: rgba(243, 85, 85, 0.4);
}

p {
  font-family: PingFang HK;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  text-align: center;
  color: #4378db;
}

.phone {
  width: 220px;
  height: 395px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.btn {
  width: 212px;
  height: 45px;
  background-color: #ffffff;
  border-radius: 58px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: PingFang HK;
  font-weight: bold;
  font-size: 23px;
  line-height: 45px;
  color: #4378db;
  text-align: center;
}
.btn::after{
  border:0;
}

</style>
