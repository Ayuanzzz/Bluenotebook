<template>
  <div class="container">
    <navBar :name="navName"></navBar>
    <div class="card">
      <span class="right"></span>
      <div class="cardPerson">
        <img src="/static/images/bigicon/iconfinder__deer_.png" alt="" />
      </div>
      <p>clue</p>
      <p>30天 | 已结束</p>
    </div>

    <div class="dudeList"></div>
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
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.container {
  width: 100%;
}
span {
  display: inline-block;
}
.card {
  position: relative;
  width: 346px;
  height: 163px;
  margin: 29px auto 20px auto;
  background-color: #4378db;
  border-radius: 26px;
  box-shadow: 10px 15px 5px rgba(64, 71, 85, 0.2);
  .right {
    position: absolute;
    background: url("https://6875-huhucloud-phuu5-1302876511.tcb.qcloud.la/icon.png?sign=553b6202a71c29ce97403283da9ef739&t=1618873925")
      no-repeat -19px -35px;
    background-size: 97px 493px;
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
    font-family: PingFang HK;
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
  background-color: #fff;
}
</style>
