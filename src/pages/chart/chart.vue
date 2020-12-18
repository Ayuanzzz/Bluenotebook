<template>
  <div class="container">
    <!-- 导航栏 -->
    <navBar :name="name"></navBar>
    <div class="bar" :style="{ height: barHeight }" v-if="showBar">
      <div class="wrap">
        <!-- 时间开光 -->
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
        <!-- 返回主页 -->
        <div class="home">
          <img src="/static/images/home.png" @click="navToHome" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar";
import mpvueEcharts from "mpvue-echarts";
import echarts from "../../../static/untils/echarts.min";

let chart = null;

export default {
  components: {
    navBar,
    mpvueEcharts,
  },
  data() {
    return {
      echarts,
      showBar: false,
      barHeight: "",
      switchChecked: true,
      name: "",
      openId: "",
      dudeObj: {},
      days: "",
      allSeconds: 0,
      love: 0,
      hate: 0,
      happyPer: null,
      sadPer: null,
      option: null,
    };
  },
  methods: {
    initChart() {
      this.option = {
        series: [
          {
            type: "pie",
            radius: ["15%", "75%"],
            center: ["50%", "50%"],
            roseType: "radius",
            label: {
              show: true,
              fontFamily: "sans-serif",
              fontSize: 16,
            },
            itemStyle: {
              normal: {
                // 设置扇形的阴影
                shadowBlur: 30,
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowOffsetX: 5,
                shadowOffsetY: 10,
              },
            },
            data: [
              {
                name:
                  Math.ceil((this.love / (this.love + this.hate)) * 100) + "%",
                value: this.love,
                // value:this.happyPer,
                color: "#F95050",
              },
              {
                name:
                  100 -
                  Math.ceil((this.love / (this.love + this.hate)) * 100) +
                  "%",
                value: this.hate,
                // value:this.sadPer,
                color: "#515151",
              },
            ],
          },
        ],
      };
      this.$refs.echarts.init();
    },
    handleInit(canvas, width, height) {
      (chart = echarts.init(canvas, null, {
        width: width,
        height: height,
      })),
        canvas.setChart(chart);
      chart.setOption(this.option);
      return chart;
    },
    switchChange() {
      this.switchChecked = !this.switchChecked;
      if (this.switchChecked) {
        this.reloveDays();
        this.days = Math.ceil(this.allSeconds / 86400000) + " 天";
      } else {
        this.brokenDays();
        this.days = "已结束";
      }
    },
    barShow() {
      if (this.barHeight) {
        this.showBar = true;
      }
    },
    //获取小伙伴详细信息
    dudeInfo() {
      const that = this;
      wx.cloud
        .callFunction({
          name: "getonedude",
          data: {
            openId: that.openId,
            name: that.name,
          },
        })
        .then((res) => {
          that.dudeObj = res.result.data[0];
          
          that.love = that.dudeObj.love;
          that.hate = that.dudeObj.hate;
          that.initChart();
          that.judgeStatus();
          console.log(res);
          console.log("获取小伙伴信息成功");
        })
        .catch((err) => {
          console.log("读取数据库失败", err);
        });
    },
    //计算相处时间
    calcDays() {
      let time = new Date();
      let now = time.getTime();
      let old = this.dudeObj.startTime;
      let onceDays = this.dudeObj.allSeconds;
      this.allSeconds = now - old + onceDays;
      this.days = Math.ceil(this.allSeconds / 86400000) + " 天";
    },
    //判断状态
    judgeStatus() {
      if (this.dudeObj.status === "doing") {
        this.switchChecked = true;
        this.calcDays();
      } else if (this.dudeObj.status === "done") {
        this.switchChecked = false;
        this.days = "已结束";
      }
    },
    //停止计时
    brokenDays() {
      const that = this;
      wx.cloud
        .callFunction({
          name: "stoptime",
          data: {
            openId: that.openId,
            name: "Jessica",
            allSeconds: that.allSeconds,
          },
        })
        .then((res) => {
          console.log("时间停止");
        })
        .catch((err) => {
          console.log("停止失败", err);
        });
    },
    //开始计时
    reloveDays() {
      let time = new Date();
      let thisTime = time.getTime();
      const that = this;
      wx.cloud
        .callFunction({
          name: "starttime",
          data: {
            openId: that.openId,
            name: "Jessica",
            startTime: thisTime,
          },
        })
        .then((res) => {
          console.log("计时开始");
        })
        .catch((err) => {
          console.log("计时失败", err);
        });
    },
    //可爱小姐姐
    happy() {
      const that = this;
      that.love++;
      console.log(that.love);
      wx.cloud
        .callFunction({
          name: "addscore",
          data: {
            openId: that.openId,
            name: that.name,
            love: that.love,
          },
        })
        .then((res) => {
          console.log("加分成功");
        })
        .catch((err) => {
          console.log("加分失败", err);
        });
    },
    //邪恶小姐姐
    sad() {
      const that = this;
      that.hate++;
      wx.cloud
        .callFunction({
          name: "cutscore",
          data: {
            openId: that.openId,
            name: that.name,
            hate: that.hate,
          },
        })
        .then((res) => {
          console.log("减分成功");
        })
        .catch((err) => {
          console.log("减分失败", err);
        });
    },
    //点击主页返回
    navToHome() {
      wx.navigateTo({
        url: "/pages/index/main",
      });
    },
  },
    onLoad(options) {
      const that = this;
      that.name = options.name;
      console.log(that.name);
      this.openId = wx.getStorageSync("ui").openId;
      this.dudeInfo();
    },
  created() {
    
  },
  mounted() {
    this.barHeight = this.globalData.barHeight;
    this.barShow();
  },
};
</script>

<style>
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
}

.time p {
  font-family: PingFang HK;
  font-size: 22.92px;
  line-height: 32px;
  color: rgba(0, 0, 0, 0.4);
}

.chart {
  position: absolute;
  width: 100%;
  height: 250px;
  top: 80px;
}

.echarts-wrap {
  width: 100%;
  height: 250px;
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
}

.heart img {
  width: 34px;
  height: 34px;
}

.heart p {
  font-family: PingFang HK;
  font-size: 24px;
  color: #f95050;
}

.home {
  position: fixed;
  bottom: 160px;
  right: 0;
}

.home img {
  margin-bottom: 50px;
  margin-right: 30px;
  width: 30px;
  height: 30px;
}
</style>
