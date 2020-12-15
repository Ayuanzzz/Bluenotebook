<template>
  <div class="container">
    <!-- 导航栏 -->
    <navBar></navBar>
    <div class="wrap">
      <!-- 选择器 -->
      <div class="picker">
        <div class="left">
          <img :src="leftImg" alt="left" @click="leftCard" v-show="leftBtn" />
        </div>
        <div class="right">
          <img
            :src="rightImg"
            alt="right"
            @click="rightCard"
            v-show="rightBtn"
          />
        </div>
        <div class="card">
          <img :src="dudeImg" @click="test2" />
        </div>
        <div class="name">
          <p>{{ name }}</p>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="btn" @click="checkDude">
        <p>创建</p>
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
      time1: "",
      time2: "",
    };
  },
  methods: {
    //选择卡片
    leftCard() {
      this.count--;
    },
    rightCard() {
      this.count++;
    },
    //创建小伙伴
    adddude() {
      const that = this;
      let time = new Date();
      that.startTime = time.getTime();
      wx.cloud
        .callFunction({
          name: "adddude",
          data: {
            openId: that.openId,
            name: that.name,
            status: "doing",
            startTime: that.startTime,
            allSeconds: 0,
            love: 0,
            hate: 0,
          },
        })
        .then((res) => {
          console.log(res);
          console.log("写入数据库成功");
        })
        .catch((err) => {
          console.log("写入数据库失败", err);
        });
    },
    //获取小伙伴列表
    getdude() {
      const that = this;
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
    test() {
      var time = new Date();
      this.time1 = time.getTime();
    },
    test2() {
      var time = new Date();
      this.time2 = time.getTime();
      var seconds = this.time2 - this.time1;
      var days = Math.ceil(seconds / 86400000);
      console.log(days);
      console.log(seconds);
    },
  },
  computed: {
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
  },
  created() {
    this.openId = wx.getStorageSync("ui").openId;
    console.log(this.openId);
  },
  mounted() {
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
  height: 370px;
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
</style>
