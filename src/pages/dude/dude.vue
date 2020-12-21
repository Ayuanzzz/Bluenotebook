<template>
  <div class="container">
    <!-- 导航栏 -->
    <navBar :name="navName"></navBar>
    <div class="wrap">
      <!-- 选择器 -->
      <div class="picker">
        <div class="left" @click="leftCard">
          <img :src="leftImg" alt="left"  v-show="leftBtn" />
        </div>
        <div class="right" @click="rightCard">
          <img
            :src="rightImg"
            alt="right"
            v-show="rightBtn"
          />
        </div>
        <div class="card">
          <img :src="dudeImg" />
        </div>
        <div class="name">
          <p>{{ name }}</p>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="btn" @click="checkDude">
        <p>创建</p>
      </div>
      <!-- 返回主页 -->
        <div class="home">
          <img src="/static/images/home.svg" @click="navToHome" />
        </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar";
export default {
  components: {
    navBar,
  },
  data() {
    return {
      navName: "小本子",
      openId: "",
      container: "",
      dudeImg: "/static/images/Peter.png",
      leftImg: "/static/images/left.svg",
      rightImg: "/static/images/right.svg",
      count: 0,
      name: "Peter",
      leftBtn: true,
      rightBtn: true,
      dudeList: [],
      startDays: "",
    };
  },
  methods: {
    //点击主页返回
    navToHome() {
      let url = "/pages/me/main";
      if (getCurrentPages().length >= 10) {
        wx.redirectTo({
          url,
        });
      } else {
        wx.navigateTo({
          url,
        });
      }
    },
    //时间格式化
    timeformat() {
      const that = this;
      var util = require("../../utils/index.js");
      that.startDays = util.formatTime(new Date());
    },
    //选择卡片
    leftCard() {
      this.count--;
      this.cardChange();
    },
    rightCard() {
      this.count++;
      this.cardChange();
    },
    //切换卡片
    cardChange() {
      const dude = ["Peter", "Vanessa", "Jonathan", "Jessica"];
      this.name = dude[this.count];
      this.dudeImg = "/static/images/" + dude[this.count] + ".png";
      if (this.count <= 0) {
        this.leftBtn = false;
      } else if (this.count >= 3) {
        this.rightBtn = false;
      } else {
        this.leftBtn = true;
        this.rightBtn = true;
      }
    },
    //创建小伙伴
    adddude() {
      const that = this;
      let time = new Date();
      that.startTime = time.getTime();
      that.timeformat();
      console.log(that.startDays);
      wx.cloud
        .callFunction({
          name: "adddude",
          data: {
            openId: that.openId,
            name: that.name,
            status: "doing",
            startTime: that.startTime,
            startDays: that.startDays,
            allSeconds: 0,
            love: 0,
            hate: 0,
          },
        })
        .then((res) => {
          console.log("写入数据库成功");
        })
        .catch((err) => {
          console.log("写入数据库失败", err);
        });
    },
    //获取小伙伴列表
    getdude() {
      const that = this;
      that.dudeList = [];
      wx.cloud
        .callFunction({
          name: "finddude",
          data: {
            openId: that.openId,
          },
        })
        .then((res) => {
          let dudeinfo = res.result.data;
          for (let i = 0; i < dudeinfo.length; i++) {
            that.dudeList.push(dudeinfo[i].name);
          }
          console.log(that.dudeList);
          console.log("拉取小伙伴列表成功");
        })
        .catch((err) => {
          console.log("读取数据库失败", err);
        });
    },
    //判断小伙伴是否存在
    checkDude() {
      if (this.dudeList.includes(this.name)) {
        wx.showToast({
          title: "已经有这位小伙伴啦，请重新选择",
          duration: 1500,
          icon: "none",
        });
      } else {
        this.adddude();
        let name = this.name;
        wx.navigateTo({
          url: "/pages/chart/main?name=" + name,
        });
      }
    },
  },
  onLoad() {
    this.openId = wx.getStorageSync("ui").openId;
    this.cardChange();
  },
  onShow() {
    this.getdude();
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
  position: absolute;
  width: 241px;
  height: 390px;
  display: flex;
  justify-content: center;
}

.picker {
  position: absolute;
  width: 241px;
  height: 182px;
  top: 0;
}

.picker .left img {
  position: absolute;
  width: 14px;
  height: 27px;
  left: 0;
  top: 55px;
}

.picker .right img {
  position: absolute;
  width: 14px;
  height: 27px;
  right: 0;
  top: 55px;
}

.picker .card {
  position: absolute;
  width: 137px;
  height: 137px;
  top: 0;
  left: 52px;
  background: #ffffff;
  border-radius: 34.25px;
}

.picker .card img {
  position: absolute;
  left: 10.7px;
  top: 10.7px;
  width: 115.59px;
  height: 115.59px;
}

.picker .name {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  bottom: 0;
}
.picker .name p {
  font-size: 23px;
  font-family: PingFang SC;
  color: rgba(145, 147, 149, 1);
}

.btn {
  position: absolute;
  width: 212px;
  height: 45px;
  bottom: 0;
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
.home {
  position: fixed;
  bottom: 0;
  right: 0;
}

.home img {
  margin-bottom: 20px;
  margin-right: 20px;
  width: 50px;
  height: 50px;
}
</style>
