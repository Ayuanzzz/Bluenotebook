<template>
  <div class="container">
    <navBar :name="navName"></navBar>
    <div class="card" :style="{ marginTop: cardTop }">
      <span class="btnRight" id="icon" @click="toTopChart()"></span>
      <div class="cardPerson" @click="toTopChart()">
        <img :src="itemImg_path2 + top.image" alt="" />
      </div>
      <p>{{ top.days }}</p>
      <p @click="toTopChart()">{{ top.name }}</p>
    </div>
    <div class="dudeList">
      <div class="title">
        <p :style="{ color: txtColor }">按{{ arrangement }}排序</p>
        <span class="btnDown" id="icon" @click="clickBtnDown()"></span>
        <span class="btnAdd" id="icon" @click="toCreate()"></span>
        <p @click="toCreate()">添加</p>
      </div>
      <ul class="dudeWrapper">
        <li id="dude" v-for="(item, index) in dudeInfo" :key="index">
          <div class="profile" @click="toChart(index)">
            <img :src="itemImg_path1 + item.dudeImg" />
          </div>
          <span class="btnOption" id="icon" @click="clickOption(index)"></span>
          <a href="#" class="name" @click="toChart(index)">{{
            item.dudeName
          }}</a>
          <p class="time">起始日:{{ item.startDays }}</p>
          <div class="option" v-show="dudeInfo[index].showOption">
            <ul>
              <li @click="toTop(index)">置顶</li>
              <li @click="deleteDude(index)">删除</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar";
import loading from "@/components/loading";
export default {
  components: {
    navBar,
    loading,
  },
  data() {
    return {
      navName: "小本子",
      arrangement: "创建日期",
      btnDown: true,
      cardTop: "",
      dudeInfo: [],
      topInfo: [],
      itemImg_path1: "/static/images/smallicon/",
      itemImg_path2: "/static/images/bigicon/",
      top: {
        image: "",
        name: "",
        days: "",
      },
      showOption: false,
      txtColor: "#405db5",
    };
  },
  methods: {
    clickOption(index) {
      this.showOption = !this.showOption;
      this.dudeInfo[index].showOption = this.showOption;
    },
    clickBtnDown() {
      this.btnDown = !this.btnDown;
      this.arrangement = this.btnDown ? "创建日期" : "开心程度";
      this.txtColor = this.btnDown ? "#405db5" : "#ab3f3f";
      if (!this.btnDown) {
        this.getDataByLove();
      } else {
        this.getData();
      }
    },
    //时间格式化
    timeformat() {
      // const that = this;
      var util = require("../../utils/index.js");
      this.startDays = util.formatTime(new Date());
    },

    //按创建时间获取小伙伴数据
    getData() {
      const that = this;
      that.ui = wx.getStorageSync("ui");
      wx.cloud
        .callFunction({
          name: "getalldude",
          data: {
            openId: that.ui.openId,
          },
        })
        .then((res) => {
          that.dudeInfo = res.result.data;
          that.mergeInfo();
        })
        .catch((err) => {
          console.log("读取数据库失败", err);
        });
    },
    //按喜爱程度获取小伙伴数据
    getDataByLove() {
      const that = this;
      that.ui = wx.getStorageSync("ui");
      wx.cloud
        .callFunction({
          name: "getbylove",
          data: {
            openId: that.ui.openId,
          },
        })
        .then((res) => {
          that.dudeInfo = res.result.data;
          that.mergeInfo();
        })
        .catch((err) => {
          console.log("读取数据库失败", err);
        });
    },
    //处理小伙伴信息
    mergeInfo() {
      for (let i = 0; i < this.dudeInfo.length; i++) {
        // 设置每个按钮的状态
        this.dudeInfo[i].showOption = false;
      }
      if (!this.dudeInfo[0]) {
        this.toCreate();
      }
    },
    //获取置顶小伙伴数据
    getTopData() {
      const that = this;
      wx.cloud
        .callFunction({
          name: "gettopdude",
          data: {
            openId: that.ui.openId,
          },
        })
        .then((res) => {
          that.topInfo = res.result.data;
          that.mergeImg();
        })
        .catch((err) => {
          console.log("读取数据库失败", err);
        });
    },
    // 预处理头部卡片信息
    mergeImg() {
      this.top.image = this.topInfo[0].dudeImg;
      this.top.name = this.topInfo[0].dudeName;
      this.globalData.id = this.topInfo[0]._id;
      let time = new Date();
      let now = time.getTime();
      let old = this.topInfo[0].startTime;
      let onceDays = this.topInfo[0].allSeconds;
      this.allSeconds = now - old + onceDays;
      this.top.days =
        Math.ceil(this.allSeconds / 86400000) +
        "天 | " +
        this.topInfo[0].status;
    },
    //置顶
    toTop(index) {
      const that = this;
      that.dudeInfo[index].showOption = false;
      let time = new Date();
      let now = time.getTime();
      that.topInfo[0] = that.dudeInfo[index];
      that.mergeImg();
      that.globalData.id = that.dudeInfo[index]._id;
      wx.cloud
        .callFunction({
          name: "updatetop",
          data: {
            openId: that.ui.openId,
            id: that.dudeInfo[index]._id,
            top: now,
          },
        })
        .then((res) => {
          wx.showToast({
            title: "置顶成功",
            icon: "success",
            duration: 2000,
          });
          console.log("置顶成功");
        })
        .catch((err) => {
          console.log("置顶失败");
        });
    },
    //删除
    deleteDude(index) {
      const that = this;
      that.dudeInfo[index].showOption = false;
      if (that.topInfo[0]._id == that.dudeInfo[index]._id) {
        that.dudeInfo.splice(index, 1);
        let index = 0;
        that.toTop(index);
      } else {
        var dudeId = that.dudeInfo[index]._id;
        that.dudeInfo.splice(index, 1);
      }
      wx.cloud
        .callFunction({
          name: "removedude",
          data: {
            openId: that.ui.openId,
            id: dudeId,
          },
        })
        .then((res) => {
          wx.showToast({
            title: "删除成功",
            icon: "success",
            duration: 2000,
          });
          console.log("删除成功");
        })
        .catch((err) => {
          console.log("删除失败");
        });
    },
    //跳转至创建伙伴界面
    toCreate() {
      let url = "/pages/create/main";
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
    //跳转
    navTo() {
      let url = "/pages/chart/main";
      if (getCurrentPages().length >= 10) {
        wx.redirectTo({
          url,
        });
      } else {
        wx.switchTab({
          url,
        });
      }
    },
    //跳转至小伙伴个人界面
    toChart(index) {
      let id = this.dudeInfo[index]._id;
      this.globalData.id = id;
      this.navTo();
    },
    //跳转至置顶小伙伴个人界面
    toTopChart() {
      this.globalData.id = this.topInfo[0]._id;
      this.navTo();
    },
  },
  onLoad() {
    this.cardTop = this.globalData.cardTop;
  },
  onShow() {
    if (this.arrangement == "创建日期") {
      this.getData();
    } else {
      this.getDataByLove();
    }
    this.getTopData();
  },
};
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  overflow: scroll;
}
#icon {
  display: inline-block;
  background-image: url("https://6875-huhucloud-phuu5-1302876511.tcb.qcloud.la/icon2.png?sign=95bb59286efd360ee6d958ef9ffd9169&t=1622504570");
  background-size: 97px 493px;
}
p {
  font-family: PingFang SC;
}
a {
  font-family: PingFang SC;
}
.card {
  position: relative;
  width: 346px;
  height: 163px;
  margin: 0 auto 20px auto;
  background-color: #4378db;
  border-radius: 26px;
  box-shadow: 10px 15px 5px rgba(64, 71, 85, 0.2);
  .btnRight {
    position: absolute;
    background: no-repeat -19px -35px;
    width: 56px;
    height: 54px;
    top: 0;
    right: 0;
  }
  .cardPerson {
    position: absolute;
    width: 97px;
    height: 97px;
    top: 25px;
    left: 37px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border-radius: 25px;
    img {
      margin: auto;
      width: 82px;
      height: 82px;
    }
  }
  p {
    position: absolute;
    color: #ffffff;
  }
  p:nth-child(3) {
    top: 35px;
    left: 160px;
    font-size: 22px;
    letter-spacing: 0.3px;
  }
  p:nth-child(4) {
    left: 160px;
    top: 75px;
    font-size: 27px;
  }
}
.dudeList {
  position: absolute;
  width: 100%;
  min-height: 30px;
  border-radius: 16px 16px 0px 0px;
  background-color: #ffffff;
  .title {
    width: 328px;
    height: 25px;
    margin: 25px auto 30px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      color: #21205a;
      font-size: 18px;
    }
    .btnDown {
      height: 20px;
      width: 20px;
      margin-right: 120px;
      background: no-repeat -36px -170px;
    }
    .btnAdd {
      width: 15px;
      height: 15px;
      background: no-repeat -38px -124px;
    }
  }
  .dudeWrapper {
    width: 346px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    #dude {
      position: relative;
      width: 165px;
      height: 125px;
      margin-bottom: 16px;
      border-radius: 16px;
      .profile {
        position: absolute;
        width: 35px;
        height: 35px;
        left: 20px;
        top: 19px;
        background-color: #ffffff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 23px;
          height: 23px;
        }
      }
      .btnOption {
        position: absolute;
        padding-bottom: 60rpx;
        padding-left: 70rpx;
        top: 24px;
        left: 100px;
        width: 24px;
        height: 24px;
      }
      .name {
        position: absolute;
        left: 21px;
        top: 64px;
        font-size: 16px;
        font-weight: 600;
      }
      .time {
        position: absolute;
        left: 16px;
        top: 92px;
        font-size: 16px;
        font-weight: 400;
      }
      .option {
        position: absolute;
        left: 16px;
        top: 13px;
        width: 96px;
        height: 101.5px;
        background: rgba(81, 81, 81, 0.9);
        border-radius: 4.35px;
        li {
          width: 100%;
          height: 49px;
          font-size: 18px;
          color: #ffffff;
          text-align: center;
          line-height: 49px;
        }
        li:nth-child(1) {
          border-bottom: 2px solid rgba(0, 0, 0, 0.5);
        }
      }
    }
    li:nth-child(4n + 1) {
      background-color: rgba(67, 120, 219, 0.16);
      .btnOption {
        background: no-repeat -15px -216.96px;
      }
      .name {
        color: #405db5;
      }
      .time {
        color: #4378db;
      }
    }
    li:nth-child(4n + 2) {
      background-color: rgba(240, 167, 20, 0.16);
      .btnOption {
        background: no-repeat -15px -276.96px;
      }
      .name {
        color: rgba(240, 167, 20, 1);
      }
      .time {
        color: rgba(240, 167, 20, 1);
      }
    }
    li:nth-child(4n + 3) {
      background-color: rgba(243, 85, 85, 0.16);
      .btnOption {
        background: no-repeat -15px -336.96px;
      }
      .name {
        color: rgba(171, 63, 63, 1);
      }
      .time {
        color: rgba(243, 85, 85, 1);
      }
    }
    li:nth-child(4n + 4) {
      background-color: rgba(40, 161, 100, 0.16);
      .btnOption {
        background: no-repeat -15px -396.96px;
      }
      .name {
        color: rgba(34, 137, 85, 1);
      }
      .time {
        color: rgba(40, 161, 100, 1);
      }
    }
  }
}
</style>
