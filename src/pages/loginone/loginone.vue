<template>
  <div class="container">
    <div class="wrap">
      <div class="title">
        <p class="big">小本子</p>
        <p class="small">怨你恋你。都记一笔</p>
      </div>
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
      <div class="btn">
        <button
          plain = "true"
          open-type="getUserInfo"
          lang="zh_CN"
          @getuserinfo="onGotUserInfo"
        >
          授权登录
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
  background-color: #f2f5f8;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap {
  width: 252px;
  height: 583px;
  position: relative;
}
.title {
  position: absolute;
  width: 158px;
  height: 104px;
  left: 0px;
  top: 0px;
  color: rgba(67, 120, 219, 1);
}
.title .big {
  font-family: Abadi MT Condensed Extra Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 55px;
  letter-spacing: 7px;
}
.title .small {
  font-family: PingFang HK;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: -0.3px;
  margin-top: 24px;
}
.wawa {
  position: absolute;
  width: 46px;
  height: 46px;
  right: 43px;
  top: 128px;
  border-radius: 50%;
  background-color: rgba(243, 85, 85, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.wawa img {
  width: 30px;
  height: 30px;
}
.peter {
  position: absolute;
  width: 93px;
  height: 93px;
  left: 35px;
  top: 196px;
  border-radius: 50%;
  background-color: rgba(67, 120, 219, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.peter img {
  width: 61px;
  height: 61px;
}
.vanessa {
  position: absolute;
  width: 46px;
  height: 46px;
  left: 190px;
  top: 298px;
  border-radius: 50%;
  background-color: rgba(253, 205, 85, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.vanessa img {
  width: 30px;
  height: 30px;
}
.jonathan {
  position: absolute;
  width: 67px;
  height: 67px;
  left: 102px;
  top: 384px;
  border-radius: 50%;
  background-color: rgba(40, 161, 100, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.jonathan img {
  width: 51px;
  height: 51px;
}
.btn button {
  position: absolute;
  width: 212px;
  height: 45px;
  bottom: 0px;
  left: 20px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  font-family: PingFang HK;
  font-weight: bold;
  font-size: 23px;
  line-height: 45px;
  color: #4378db;
  text-align: center;
}
.btn button[plain]{
  border:none
}
</style>