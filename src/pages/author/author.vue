<template>
<div>
<div class="container" v-if="containerShow">
    <span>嗨,</span>
    <span>我是</span>
    <span @click="show()">阿圆</span>
  </div>
  <div class="mask" v-if="maskShow">
    <img src="/static/images/github.png" alt="" />
    <p>github.com/Ayuanzzz/Bluenotebook</p>
  </div>
</div>
  
  
</template>

<script>
export default {
  data(){
    return{
      containerShow:true,
      maskShow:false,
    }
  },
  methods:{
    show(){
      this.containerShow = false;
      this.maskShow = true
    }
  },
  onHide(){
    this.maskShow = false;
    this.containerShow = true;
  }
};
</script>

<style lang='scss'>
span {
  font-family: PingFang SC;
  font-weight: bold;
}
.container {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  span:nth-child(1) {
    font-size: 60px;
    padding-top: 55%;
    display: block;
  }
  span:nth-child(2) {
    font-size: 50px;
  }
  span:nth-child(3) {
    font-size: 50px;
    border-bottom: 2px solid #0088ff;
    color: #0088ff;
  }
}

.mask {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  img{
    width: 90px;
    height: 90px;
    padding-top: 55%;
    padding-bottom: 25px;
  }
  p{
    font-size: 20px;
    font-family: Helvetica;
  }
}
</style>