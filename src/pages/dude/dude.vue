<template>
  <div class="container">
    <navBar :name="navName"></navBar>
    <div class="card">
      <div class="imgRight">
        <img src="/static/images/cardRight.svg" />
      </div>
      <div class="cardPerson">
        <img src="/static/images/bigicon/iconfinder__deer_.png" alt="" />
      </div>
      <div class="cardBigText">
        <p>clue</p>
      </div>
      <div class="cardSmallText">
        <p>30天|已结束</p>
      </div>
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

<style lang='scss'>
.container {
  width: 100%;
}
.card {
  border: 1px solid skyblue;
  position: relative;
  width: 346px;
  height: 163px;
  margin: 29px auto 20px auto;
  background-color: #4378db;
  border-radius: 26px;
  box-shadow: 10px 15px 5px rgba(67, 120, 219, 0.2);
  .imgRight {
    img {
      position: absolute;
      width: 56px;
      height: 54px;
      right: 0;
    }
  }
  .cardPerson {
    position: absolute;
    width: 97px;
    height: 97px;
    top: 25px;
    left: 37px;
    background-color: #ffffff;
    border-radius: 25px;
    img {
      margin: auto;
      width: 82px;
      height: 82px;
    }
  }
}
.dudeList {
  border: 1px solid orange;
  width: 100%;
  height: 500px;
  background-color: #fff;
}
</style>
