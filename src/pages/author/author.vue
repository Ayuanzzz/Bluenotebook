<template>
  <div class="container">
    <span>嗨,</span>
    <span>我是</span>
    <a href="https://github.com/Ayuanzzz/Bluenotebook">阿圆</a>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss'>
span {
  font-family: PingFang SC;
  font-weight: bold;
  display: block;
}
.container {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
}
span:nth-child(1) {
  font-size: 60px;
  padding-top: 55%;
}
span:nth-child(2) {
  font-size: 50px;
  display: inline-block;
}
a {
  font-family: PingFang SC;
  font-weight: bold;
  font-size: 50px;
  border-bottom: 2px solid #0088ff;
  color: #0088ff;
  display: inline-block;
}
</style>