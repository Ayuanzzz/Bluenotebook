<template>
  <div class="container">
    <!-- 导航栏 -->
    <navBar></navBar>
    <div class="wrap">
      <!-- 选择器 -->
      <div class="picker">
        <div class="left">
          <img :src="leftImg" alt="left" @click="leftCard"/>
        </div>
        <div class="right">
          <img :src="rightImg" alt="right" @click="rightCard"/>
        </div>
        <div class="card">
          <img :src="dudeImg" />
        </div>
        <div class="name">
          <p>{{name}}</p>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="button">
        <p>创建</p>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/navBar';
export default {
    components: {
        navBar
    },
    data() {
        return {
            container: '',
            dudeImg:'/static/images/Peter.png',
            leftImg:'/static/images/lefthidden.svg',
            rightImg:'/static/images/right.svg',
            count:0,
            showRight:true,
            showLeft:true,
            name:'Peter'
        }
    },
    methods:{
        //选择卡片
        leftCard(){
            this.count--;
        },
        rightCard(){
            this.count++;
        }
    },
    computed:{
        cardChange(){
            const dude = ['Peter','Vanessa','Jonathan','Jessica']
            this.name = dude[this.count]
            this.dudeImg = '/static/images/' + dude[this.count]+'.png'
            if(this.count<=0){
                this.leftImg = '/static/images/lefthidden.svg';
            }else if(this.count>=3){
                this.rightImg = '/static/images/righthidden.svg';
            }else{
                this.leftImg = '/static/images/left.svg';
                this.rightImg = '/static/images/right.svg';
            }
        }
            
    }
}
</script>

<style>
.container {
  position: relative;
  background-color: #f2f5f8;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrap {
  position: absolute;
  width: 241px;
  height: 370px;
  display: flex;
  justify-content: center;
}

.picker {
  position: absolute;
  width: 241px;
  height: 182px;
  top: 0;
}

.picker .left img {
  position: absolute;
  width: 14px;
  height: 27px;
  left: 0;
  top: 55px;
}

.picker .right img {
  position: absolute;
  width: 14px;
  height: 27px;
  right: 0;
  top: 55px;
}

.picker .card {
  position: absolute;
  width: 137px;
  height: 137px;
  top: 0;
  left: 52px;
  background: #ffffff;
  border-radius: 34.25px;
}

.picker .card img {
  position: absolute;
  left: 10.7px;
  top: 10.7px;
  width: 115.59px;
  height: 115.59px;
}

.picker .name {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  bottom: 0;
}
.picker .name p{
  font-size: 23px;
  font-family: PingFang SC;
  color: rgba(145, 147, 149, 1);
}

.button {
  position: absolute;
  width: 212px;
  height: 45px;
  bottom: 0;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  text-align: center;

}

.button p {
  font-family: PingFang HK;
  font-weight: 600;
  font-size: 22.9217px;
  line-height: 45px;
  color: #4378db;
}
</style>
