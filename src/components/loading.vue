<template>
  <div class="spinner-box">
    <div class="pulse-container">
      <div class="pulse-bubble pulse-bubble-1"></div>
      <div class="pulse-bubble pulse-bubble-2"></div>
      <div class="pulse-bubble pulse-bubble-3"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss'>
.spinner-box {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  z-index: 1000;
}
@keyframes pulse {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0.25;
    transform: scale(0.75);
  }
}
.pulse-container {
  width: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2000;
}

.pulse-bubble {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #4378db;
}
.pulse-bubble-1 {
    animation: pulse 0.4s ease 0s infinite alternate;
  }
  .pulse-bubble-2 {
    animation: pulse 0.4s ease 0.2s infinite alternate;
  }
  .pulse-bubble-3 {
    animation: pulse 0.4s ease 0.4s infinite alternate;
  }
</style>