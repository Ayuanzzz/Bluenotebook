<template>
  <div class="container">
    <navBar :name="name"></navBar>
    <div class="bar" :style="{ height: barHeight }">
      <div class="wrap">
        <!-- 时间开关 -->
        <div class="time">
          <p>{{ days }}</p>
          <switch :checked="switchChecked" @click="switchChange" />
        </div>
        <!-- 饼状图 -->
        <div class="chart">
          <mpvue-echarts
            lazyLoad
            :echarts="echarts"
            :onInit="handleInit"
            ref="echarts"
          />
        </div>
        <!-- 心情按钮 -->
        <div class="heart" @click="happy">
          <img src="/static/images/love.svg" />
          <p>{{ love }}</p>
        </div>
        <div class="heart" style="bottom: 0px" @click="sad">
          <img src="/static/images/hate.svg" />
          <p style="color: #515151">{{ hate }}</p>
        </div>
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
      name: "",
      id: "79550af260aa2848196dd10a14fd0557",
      barHeight: "",
      openId: "",
      dudeInfo: "",
      love: "",
      hate: "",
      switchChecked: true,
      days:"",
    };
  },
  methods: {
    //获取小伙伴信息
    getDudeInfo() {
      const that = this;
      wx.cloud
        .callFunction({
          name: "getonedude",
          data: {
            openId: that.openId,
            id: that.id,
          },
        })
        .then((res) => {
          that.dudeInfo = res.result.data[0];
          that.love = that.dudeInfo.love;
          that.hate = that.dudeInfo.hate;
          that.name = that.dudeInfo.dudeName;
          // that.initChart();
          that.setStatus();
          console.log("获取小伙伴信息成功");
        })
        .catch((err) => {
          console.log("读取数据库失败", err);
        });
    },
    //设置状态
    setStatus() {
      if (this.dudeInfo.status === "doing") {
        this.switchChecked = true;
        this.calcDays();
      } else if (this.dudeInfo.status === "done") {
        this.switchChecked = false;
        this.days = "已结束";
      }
    },
    //计算相处时间
    calcDays() {
      let time = new Date();
      let now = time.getTime();
      let old = this.dudeInfo.startTime;
      let onceDays = this.dudeInfo.allSeconds;
      let allSeconds = now - old + onceDays;
      this.days = Math.ceil(allSeconds / 86400000) + " 天";
      console.log(this.days);
    },
  },
  created() {
    this.barHeight = this.globalData.barHeight;
    console.log(this.barHeight);
    this.openId = wx.getStorageSync("ui").openId;
  },
  onShow() {
    this.getDudeInfo();
  },
};
</script>

<style lang='scss'>
.container {
  position: relative;
  background-color: #f2f5f8;
  width: 100%;
  height: 100%;
}

.bar {
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrap {
  position: relative;
  width: 100%;
  height: 549px;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.time {
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: space-around;
  p {
    font-family: PingFang HK;
    font-size: 22.92px;
    line-height: 32px;
    color: rgba(0, 0, 0, 0.4);
  }
}

.chart {
  position: absolute;
  width: 100%;
  height: 250px;
  top: 80px;
}

.heart {
  position: absolute;
  width: 212px;
  height: 45px;
  bottom: 97px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  img {
    width: 34px;
    height: 34px;
  }
  p {
    font-family: PingFang HK;
    font-size: 24px;
    color: #f95050;
  }
}
</style>