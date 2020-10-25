<template>
  <div class="container" :style="{height:screenHeight}">
    <!-- 导航栏 -->
    <navBar></navBar>
    <!-- 置顶卡片部分 -->
    <div class="card" :style="{top:cardTop}">
      <div class="imgRight">
        <img src="/static/images/cardRight.svg" alt="cardRight" />
      </div>
      <div class="cardPerson">
        <img src="/static/images/Peter.png" alt="Peter" />
      </div>
      <div class="cardBigText">
        <p>Jack</p>
      </div>
      <div class="cardSmallText">
        <p>34天</p>
      </div>
    </div>
    <!-- 小伙伴列表 -->
    <div class="dude" :style="{height:dudeHeight}">
      <div class="dudeTitle">
        <p>小伙伴</p>
        <img src="/static/images/add.svg" alt="add" />
      </div>
      <div class="dudeList" :style="{height:dudeListMaxHeight}">
        <div class="dudeCard" :style="{backgroundColor:dudeOne.bgColor}">
          <div class="profile">
            <img src="/static/images/Peter.png" />
          </div>
          <div class="optionsButton">
            <img :src="dudeOne.img" />
          </div>
          <div class="name" :style="{color:dudeOne.name}">
            <p>Peter</p>
          </div>
          <div class="time" :style="{color:dudeOne.time}">
            <p>起始日:2020.08.11</p>
          </div>
          <div class="control">
            <p>置顶</p>
            <hr />
            <p>删除</p>
          </div>
        </div>
        <div class="dudeCard" :style="{backgroundColor:dudeTwo.bgColor}">
          <div class="profile">
            <img src="/static/images/Vanessa.png" />
          </div>
          <div class="optionsButton">
            <img :src="dudeTwo.img" />
          </div>
          <div class="name" :style="{color:dudeTwo.name}">
            <p>Vanessa</p>
          </div>
          <div class="time" :style="{color:dudeTwo.time}">
            <p>起始日:2020.08.11</p>
          </div>
          <div class="control">
            <p>置顶</p>
            <hr />
            <p>删除</p>
          </div>
        </div>
        <div class="dudeCard" :style="{backgroundColor:dudeThree.bgColor}">
          <div class="profile">
            <img src="/static/images/Jessica.png" />
          </div>
          <div class="optionsButton">
            <img :src="dudeThree.img" />
          </div>
          <div class="name" :style="{color:dudeThree.name}">
            <p>Jessica</p>
          </div>
          <div class="time" :style="{color:dudeThree.time}">
            <p>起始日:2020.08.11</p>
          </div>
          <div class="control">
            <p>置顶</p>
            <hr />
            <p>删除</p>
          </div>
        </div>
        <div class="dudeCard" :style="{backgroundColor:dudeFour.bgColor}">
          <div class="profile">
            <img src="/static/images/Jonathan.png" />
          </div>
          <div class="optionsButton">
            <img :src="dudeFour.img" />
          </div>
          <div class="name" :style="{color:dudeFour.name}">
            <p>Jonathan</p>
          </div>
          <div class="time" :style="{color:dudeFour.time}">
            <p>起始日:2020.08.11</p>
          </div>
          <div class="control">
            <p>置顶</p>
            <hr />
            <p>删除</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/navBar';
export default {
    components:{
      navBar
    },
    data() {
        return {
          screenHeight:'',
          dudeHeight:'',
          navHeight:'',
          cardTop:'',
          dudeListMaxHeight:'',
          scale:'',
          dudeOne:{
            bgColor:'rgba(67, 120, 219, 0.16);',
            name:'rgba(64, 93, 181, 1)',
            time:'rgba(67, 120, 219, 1)',
            img:'/static/images/optionsOne.svg'
          },
          dudeTwo:{
            bgColor:'rgba(240, 167, 20, 0.16)',
            name:'rgba(240, 167, 20, 1)',
            time:'rgba(240, 167, 20, 1)',
            img:'/static/images/optionsTwo.svg'
          },
          dudeThree:{
            bgColor:'rgba(243, 85, 85, 0.16)',
            name:'rgba(171, 63, 63, 1)',
            time:'rgba(243, 85, 85, 1)',
            img:'/static/images/optionsThree.svg'
          },
          dudeFour:{
            bgColor:'rgba(40, 161, 100, 0.16)',
            name:'rgba(34, 137, 85, 1)',
            time:'rgba(40, 161, 100, 1)',
            img:'/static/images/optionsFour.svg'
          }
        }
    },
    methods: {
        //获取导航栏参数
        getNav() {
            let that = this;
            //获取按钮信息
            const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
            //获取用户手机信息
            const systemInfo = wx.getSystemInfoSync();
            that.screenHeight = systemInfo.screenHeight + "px";
            that.scale = systemInfo.screenWidth/375;
            that.navHeight =
                (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 +
                menuButtonInfo.height +
               systemInfo.statusBarHeight;
            that.globalData.navHeight = that.navHeight + "px";
            //缩放比例
            that.cardTop = that.navHeight + that.scale*29 +"px";
            that.dudeHeight = systemInfo.screenHeight - that.navHeight - that.scale*222 + "px";
            that.dudeListMaxHeight = systemInfo.screenHeight - that.navHeight - that.scale*222- that.scale*104 + "px";
            console.log(that.dudeListMaxHeight);
            that.globalData.imgHeight = menuButtonInfo.height + "px";
            that.globalData.imgTop = menuButtonInfo.top + "px";
            that.globalData.imgLeft = systemInfo.screenWidth - menuButtonInfo.right + "px";
        },
        
    },
    created(){
      this.getNav()
      console.log(this.dudeTwo.bgColor);
    },
    mounted() { 
    },
    computed(){
      
    }
}
</script>

<style>
.container {
  position: relative;
  background-color: #f2f5f8;
  width: 100%;
  display: flex;
  justify-content: center;
}
.card {
  position: absolute;
  width: 345px;
  height: 163px;
  background-color: #4378db;
  border-radius: 26px;
  box-shadow: 10px 15px 5px rgba(67, 120, 219, 0.2);
}
.card .imgRight img {
  position: absolute;
  width: 56px;
  height: 54px;
  right: 0;
}
.card .cardPerson {
  position: absolute;
  width: 97px;
  height: 97px;
  top: 25px;
  left: 37px;
  background-color: #ffffff;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card .cardPerson img {
  position: absolute;
  width: 82px;
  height: 82px;
}
.card .cardBigText p {
  position: absolute;
  top: 35px;
  left: 165px;
  font-family: PingFang HK;
  font-size: 28px;
  color: #ffffff;
}
.card .cardSmallText p {
  position: absolute;
  left: 166px;
  top: 79px;
  font-family: PingFang HK;
  font-size: 22px;
  color: rgba(255, 255, 255, 0.8);
}
.dude {
  position: absolute;
  width: 100%;
  bottom: 0px;
  border-radius: 16px 16px 0px 0px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
}
.dude .dudeTitle {
  position: absolute;
  width: 322px;
  height: 27px;
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dude .dudeTitle p {
  font-family: Poppins;
  font-size: 18px;
  color: rgba(33, 32, 90, 1);
}
.dude .dudeTitle img {
  width: 15px;
  height: 15px;
}
.dude .dudeList {
  position: absolute;
  width: 346px;
  overflow: scroll;
  margin-top: 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 16px;
}
.dude .dudeList .dudeCard {
  position: relative;
  width: 165px;
  height: 125px;
  border-radius: 16px;
}
.dudeList .dudeCard .profile {
  position: absolute;
  width: 35px;
  height: 35px;
  left: 19px;
  top: 16px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dudeCard .profile img {
  width: 23px;
  height: 23px;
}
.dudeCard .optionsButton img {
  width: 24px;
  height: 24px;
  position: absolute;
  right: 16px;
  top: 23px;
}
.dudeCard .name {
  font-family: Poppins;
  font-size: 16px;
  position: absolute;
  left: 16px;
  top: 64px;
}
.dudeCard .time {
  font-family: PingFang SC;
  font-size: 14px;
  position: absolute;
  left: 16px;
  bottom: 16px;
}
.dudeCard .control {
  width: 45px;
  height: 53px;
  position: absolute;
  top: 56px;
  right: 7px;
  background-color: rgba(81, 81, 81, 1);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  align-content: space-around;
}
.dudeCard .control p {
  font-family: PingFang SC;
  font-size: 12px;
  color: rgba(255, 255, 255, 1);
}
.dudeCard .control hr {
  background-color: rgba(0, 0, 0, 0.22);
  width: 100%;
  height: 1px;
}
</style>
