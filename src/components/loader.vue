<template>
  <!-- 加载动画 -->
  <div class="loaders-item">
    <BallPulse />
  </div>
</template>

<script>
import BallPulse from "mpvue-loading/src/loaders/ball-pulse";
export default {
  components: {
    BallPulse,
  },
};
</script>

<style>
.loaders-item {
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: #ed5565;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>