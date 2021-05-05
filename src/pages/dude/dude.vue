<template>
  <div class="container">
    <navBar :name="navName"></navBar>
    <div class="card">
      <span class="btnRight" id="icon"></span>
      <div class="cardPerson">
        <img src="/static/images/bigicon/iconfinder__deer_.png" alt="" />
      </div>
      <p>clue</p>
      <p>30天 | 已结束</p>
    </div>

    <div class="dudeList">
      <div class="title">
        <p>按{{ arrangement }}排序</p>
        <span class="btnDown" id="icon" @click="clickBtnDown()"></span>
        <span class="btnAdd" id="icon"></span>
        <p>添加</p>
      </div>
      <ul class="dudeWrapper">
        <li class="dude">
          <div class="profile">
            <img src="/static/images/bigicon/iconfinder__deer_.png" alt="" />
          </div>
          <span class="btnOption" id="icon" @click="clickOption()"></span>
          <a href="#" class="name">蛙蛙</a>
          <p class="time">起始日:2020.08.11</p>
          <div class="option" v-if="showOption">
            <ul>
              <li>置顶</li>
              <li>删除</li>
            </ul>
          </div>
        </li>
        <li class="dude"></li>
        <li class="dude"></li>
      </ul>
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
      showOption: false,
      arr: ["创建日期", "快乐程度"],
      arrangement: "",
      index: 0,
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
  },
  created() {
    this.arrangement = "创建日期";
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
    .dude {
      background-color: rgba(67, 120, 219, 0.16);
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
        border-radius: 50%;
        background-color: #ffffff;
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
        background: no-repeat -34px -216.96px;
      }
      .name {
        position: absolute;
        left: 21px;
        top: 64px;
        font-size: 16px;
        font-weight: 600;
        color: #405db5;
      }
      .time {
        position: absolute;
        left: 16px;
        top: 92px;
        font-size: 16px;
        font-weight: 400;
        color: #4378db;
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
  }
}
</style>
