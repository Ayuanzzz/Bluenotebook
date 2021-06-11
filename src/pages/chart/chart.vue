<template>
  <div class="container">
    <navBar :name="name"></navBar>
    <div class="bar">
      <div class="wrap" :style="{ marginTop: wrapMarginTop }">
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
        <div class="heart" @click="happy()">
          <img src="/static/images/love.svg" />
          <p>{{ love }}</p>
        </div>
        <div class="heart" style="bottom: 0px" @click="sad()">
          <img src="/static/images/hate.svg" />
          <p style="color: #515151">{{ hate }}</p>
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
      name: "",
      id: "",
      barHeight: "",
      openId: "",
      dudeInfo: "",
      love: "",
      hate: "",
      switchChecked: true,
      days: "",
      allSeconds: 0,
      lovePer: 0,
      happyPer: "",
      sadPer: "",
      echarts,
      option: {},
      wrapMarginTop: "",
    };
  },
  methods: {
    //计时开关
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
          console.log(that.dudeInfo);
          that.love = that.dudeInfo.love;
          that.hate = that.dudeInfo.hate;
          that.name = that.dudeInfo.dudeName;
          that.days = that.dudeInfo.status;
          if (that.days === "进行中") {
            that.calcDays();
          }
          that.initChart();
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
      let old = this.dudeInfo.startTime;
      let onceDays = this.dudeInfo.allSeconds;
      this.allSeconds = now - old + onceDays;
      this.days = Math.ceil(this.allSeconds / 86400000) + " 天";
    },
    //停止计时
    brokenDays() {
      const that = this;
      wx.cloud
        .callFunction({
          name: "stoptime",
          data: {
            openId: that.openId,
            id: that.id,
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
            id: that.id,
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
    //初始化表格
    initChart() {
      this.calcPer();
      this.option = {
        calculable: true,
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
                name: this.happyPer,
                value: this.love,
                color: "#F95050",
              },
              {
                name: this.sadPer,
                value: this.hate,
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
    //计算百分比
    calcPer() {
      if ((this.love == 0) & (this.hate == 0)) {
        this.happyPer = "0%";
        this.sadPer = "0%";
      } else if ((this.love == 0) & (this.hate > 0)) {
        this.happyPer = "0%";
        this.sadPer = "100%";
      } else if ((this.hate == 0) & (this.love > 0)) {
        this.sadPer = "0%";
        this.happyPer = "100%";
      } else {
        this.lovePer = Math.ceil((this.love / (this.love + this.hate)) * 100);
        this.happyPer = this.lovePer + "%";
        this.sadPer =
          100 - Math.ceil((this.love / (this.love + this.hate)) * 100) + "%";
      }
    },
    //加分
    happy() {
      const that = this;
      that.love++;
      console.log(that.love);
      wx.cloud
        .callFunction({
          name: "addscore",
          data: {
            openId: that.openId,
            id: that.id,
            love: that.love,
          },
        })
        .then((res) => {
          that.initChart();
          console.log("加分成功");
        })
        .catch((err) => {
          console.log("加分失败", err);
        });
    },
    //减分
    sad() {
      const that = this;
      that.hate++;
      wx.cloud
        .callFunction({
          name: "cutscore",
          data: {
            openId: that.openId,
            id: that.id,
            hate: that.hate,
          },
        })
        .then((res) => {
          console.log(res);
          that.initChart();
          console.log("减分成功");
        })
        .catch((err) => {
          console.log("减分失败", err);
        });
    },
    //更新喜爱程度
    loveLevel() {
      const that = this;
      let lovePer;
      if ((that.love == 0) & (that.hate > 0)) {
        lovePer = -100;
      } else if ((that.hate == 0) & (that.love > 0)) {
        lovePer = 100;
      } else {
        lovePer = that.lovePer;
      }
      console.log(lovePer);
      wx.cloud
        .callFunction({
          name: "updatelevel",
          data: {
            openId: that.openId,
            id: that.id,
            lovePer: lovePer,
          },
        })
        .then((res) => {
          console.log("更新成功");
        })
        .catch((err) => {
          console.log("更新失败", err);
        });
    },
  },
  onLoad() {
    this.wrapMarginTop = this.globalData.navMargin;
    this.openId = wx.getStorageSync("ui").openId;
  },
  onShow() {
    this.id = this.globalData.id;
    this.getDudeInfo();
  },
  onHide() {
    this.loveLevel();
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
  top: 0;
  width: 100%;
  height: 100%;
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
}

.time {
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: space-around;
  p {
    font-family: PingFang SC;
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
    font-family: PingFang SC;
    font-size: 24px;
    color: #f95050;
  }
}
</style>