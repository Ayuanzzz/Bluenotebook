<template>
  <div class="container">
    <navBar :name="navName"></navBar>
    <div class="card">
      <div class="imgRight">
        <img src="/static/images/cardRight.svg" />
      </div>
      <div class="cardPerson">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfinder__deer_"></use>
        </svg>
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
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
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
}
.dudeList {
  border: 1px solid orange;
  width: 100%;
  height: 500px;
  background-color: #fff;
}
</style>
