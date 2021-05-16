<template>
  <div class="container">
    <loading v-if="btnLoading"></loading>
    <navBar :name="navName"></navBar>
    <div class="card">
      <span class="btnRight" id="icon" @click="loader()"></span>
      <div class="cardPerson">
        <img :src="itemImg_path2+top.image" alt="" />
      </div>
      <p>{{top.name}}</p>
      <p>{{top.days}}</p>
    </div>

    <div class="dudeList">
      <div class="title">
        <p>按{{ arrangement }}排序</p>
        <span class="btnDown" id="icon" @click="clickBtnDown()"></span>
        <span class="btnAdd" id="icon"></span>
        <p>添加</p>
      </div>
      <ul class="dudeWrapper">
        <li id="dude" :class="item.class" v-for="(item, index) in dudeInfo"
          :key="index">
          <div class="profile">
            <img :src="itemImg_path1+item.profile" />
          </div>
          <span class="btnOption" id="icon" @click="clickOption()"></span>
          <a href="#" class="name">{{item.name}}</a>
          <p class="time">起始日:{{item.startDays}}</p>
          <div class="option" v-show="showOption">
            <ul>
              <li>置顶</li>
              <li>删除</li>
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
      showOption: false,
      arr: ["创建日期", "快乐程度"],
      arrangement: "",
      index: 0,
      btnLoading: false,
      screenHeight: "",
      dudeHeight: "",
      navHeight: "",
      cardTop: "",
      dudeListMaxHeight: "",
      scale: "",
      dudeInfo: [],
      itemImg_path1:"/static/images/smallicon/",
      itemImg_path2:"/static/images/bigicon/",
      top: {
        image: "",
        name: "",
        days: "",
      },
    };
  },
  methods: {
    clickOption() {
      this.showOption = !this.showOption;
      console.log(this.showOption);
    },
    clickBtnDown() {
      if (this.index < 1) {
        this.index++;
      } else {
        this.index = 0;
      }
      this.arrangement = this.arr[this.index];
    },
    loader() {
      this.btnLoading = true;
    },
    //时间格式化
    timeformat() {
      // const that = this;
      var util = require("../../utils/index.js");
      this.startDays = util.formatTime(new Date());
    },
    //获取导航栏参数
    getNav() {
      let that = this;
      //获取按钮信息
      const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
      //获取用户手机信息
      const systemInfo = wx.getSystemInfoSync();
      that.globalData.screenHeight = systemInfo.screenHeight;
      that.scale = systemInfo.screenWidth / 375;
      that.navHeight =
        (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 +
        menuButtonInfo.height +
        systemInfo.statusBarHeight;
      that.globalData.navHeight = that.navHeight + "px";
      that.globalData.barHeight =
        systemInfo.screenHeight - that.navHeight + "px";
      //缩放比例
      that.cardTop = that.navHeight + that.scale * 29 + "px";
      that.dudeHeight =
        systemInfo.screenHeight - that.navHeight - that.scale * 222 + "px";
      that.dudeListMaxHeight =
        systemInfo.screenHeight -
        that.navHeight -
        that.scale * 222 -
        that.scale * 104 +
        "px";
      that.globalData.imgHeight = menuButtonInfo.height + "px";
      that.globalData.imgTop = menuButtonInfo.top + "px";
      that.globalData.imgLeft =
        systemInfo.screenWidth - menuButtonInfo.right + "px";
    },
    //获取小伙伴数据
    getData() {
      const that = this;
      that.ui = wx.getStorageSync("ui");
      wx.cloud
        .callFunction({
          name: "finddude",
          data: {
            openId: that.ui.openId,
          },
        })
        .then((res) => {
          that.dudeInfo = res.result.data;
          for(let i=0;i<that.dudeInfo.length;i++){
            that.dudeInfo[i].class="dudeStyle-"+(i+1)%4
          }
          console.log(that.dudeInfo);
          if (that.dudeInfo[0]) {
            that.mergeImg();
          } else {
            that.toDude();
          }
        })
        .catch((err) => {
          console.log("读取数据库失败", err);
        });
    },
    // 预处理头部卡片信息
    mergeImg() {
      this.top.image = this.dudeInfo[0].profile;
      this.top.name = this.dudeInfo[0].name;
      let time = new Date();
      let now = time.getTime();
      let old = this.dudeInfo[0].startTime;
      let onceDays = this.dudeInfo[0].allSeconds;
      this.allSeconds = now - old + onceDays;
      this.top.days = Math.ceil(this.allSeconds / 86400000) + "天 | "+this.dudeInfo[0].status;
    },
  },
  created() {
    this.arrangement = "创建日期";
    this.getNav();
  },
  onShow() {
    this.getData();
  },
};
</script>

<style lang="scss">
.container {
  width: 100%;
}
#icon {
  display: inline-block;
  background-image: url("https://6875-huhucloud-phuu5-1302876511.tcb.qcloud.la/icon.png?sign=553b6202a71c29ce97403283da9ef739&t=1618873925");
  background-size: 97px 493px;
}
p {
  font-family: PingFang HK;
}
a {
  font-family: PingFang HK;
}
.card {
  position: relative;
  width: 346px;
  height: 163px;
  margin: 29px auto 20px auto;
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
    top: 30px;
    left: 165px;
    font-size: 28px;
  }
  p:nth-child(4) {
    left: 166px;
    top: 79px;
    font-size: 22px;
    font-weight: 300;
    letter-spacing: 0.3px;
  }
}
.dudeList {
  border: 1px solid orange;
  width: 100%;
  height: 444px;
  overflow: hidden;
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
      height: 7px;
      width: 11.5px;
      margin-right: 120px;
      background: no-repeat -41px -175px;
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
        top: 24px;
        left: 125px;
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
    .dudeStyle-1 {
      background-color: rgba(67, 120, 219, 0.16);
      .btnOption {
        background: no-repeat -34px -216.96px;
      }
      .name {
        color: #405db5;
      }
      .time {
        color: #4378db;
      }
    }
    .dudeStyle-2 {
      background-color: rgba(240, 167, 20, 0.16);
      .btnOption {
        background: no-repeat -34px -276.96px;
      }
      .name {
        color: rgba(240, 167, 20, 1);
      }
      .time {
        color: rgba(240, 167, 20, 1);
      }
    }
    .dudeStyle-3 {
      background-color: rgba(243, 85, 85, 0.16);
      .btnOption {
        background: no-repeat -34px -336.96px;
      }
      .name {
        color: rgba(171, 63, 63, 1);
      }
      .time {
        color: rgba(243, 85, 85, 1);
      }
    }
    .dudeStyle-0 {
      background-color: rgba(40, 161, 100, 0.16);
      .btnOption {
        background: no-repeat -34px -396.96px;
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
