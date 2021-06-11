<template>
  <div class="container">
    <navBar :name="navName"></navBar>
    <loader v-if="show"></loader>
    <div class="avatar" :style="{top:avatarTop}">
      <p>选择头像</p>
      <swiper
        class="swiper"
        indicator-dots="true"
        circular="true"
        @change="switchItem('switchItem', $event)"
      >
        <block v-for="(item, index) in avatar" :key="index">
          <swiper-item>
            <image :src="itemImg_path + item" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="nickName" :style="{top:nickNameTop}">
      <p>昵称</p>
      <form @submit="fromSubmit" report-submit="true">
        <input
          name="input"
          auto-focus
          type="text"
          placeholder="最多输入6个字哦"
          maxlength="6"
        />
        <div class="btn-area">
          <button formType="submit" type="primary">创建</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar";
import loader from "@/components/loading"
export default {
  components: {
    navBar,
  },
  data() {
    return {
      navName:"创建小伙伴",
      show:false,
      avatarTop:"",
      nickNameTop:"",
      itemImg_path: "/static/images/bigicon/",
      avatar: [
        "iconfinder__deer_.png",
        "iconfinder_bug--animal-pet-wild-domestic_.png",
        "iconfinder_Food_C_.png",
        "iconfinder_frog-animal-pet-wild-domestic_.png",
        "iconfinder_icon_animal_cachorro_.png",
        "iconfinder_icon_animal_pato_.png",
        "iconfinder_Inkcontober_Screech_Psyduck_.png",
        "iconfinder_octopus-sea--animal-pet-wild-domestic_.png",
        "iconfinder_parrot-bird--animal-pet-wild-domestic_.png",
        "iconfinder_pig-animal-pet-wild-domestic_.png",
        "iconfinder_pinguin-animal-pet-wild-domestic_.png",
        "iconfinder_sheep-animal-pet-wild-domestic_.png",
      ],
      openId: "",
      userName: "",
      dudeName: "",
      dudeImg: "iconfinder__deer_.png",
    };
  },
  methods: {
    fromSubmit(e) {
      console.log("form发生了submit事件，携带数据为：", e);
      console.log(e.target.value.input);
      this.dudeName = e.target.value.input;
      this.adddude();
    },
    switchItem: function (prompt, res) {
      let count = res.mp.detail.current;
      this.dudeImg = this.avatar[count];
    },
    //时间格式化
    timeformat() {
      const that = this;
      var util = require("../../utils/index.js");
      that.startDays = util.formatTime(new Date());
    },
    //创建小伙伴
    adddude() {
      const that = this;
      that.show = true;
      let time = new Date();
      that.startTime = time.getTime();
      that.timeformat();
      console.log(that.startDays);
      wx.cloud
        .callFunction({
          name: "adddude",
          data: {
            openId: that.openId,
            userName: that.userName,
            dudeName: that.dudeName,
            dudeImg: that.dudeImg,
            status: "进行中",
            startTime: that.startTime,
            startDays: that.startDays,
            orderTime: that.startTime,
            allSeconds: 0,
            love: 0,
            lovePer:0,
            hate: 0,
          },
        })
        .then((res) => {
          that.show = false;
          that.navToHome();
          console.log("写入数据库成功");
        })
        .catch((err) => {
          console.log("写入数据库失败", err);
        });
    },
    //返回首页
    navToHome() {
      let url = "/pages/dude/main";
      if (getCurrentPages().length >= 10) {
        wx.redirectTo({
          url,
        });
      } else {
        wx.switchTab({
          url,
        });
      }
    },
  },
  onLoad() {
    let height = parseInt(this.globalData.navHeight)
    this.avatarTop = this.globalData.navHeight;
    this.nickNameTop = height + 300 + "px"
    this.openId = wx.getStorageSync("ui").openId;
    this.userName = wx.getStorageSync("ui").nickName;
  },
};
</script>

<style lang='scss'>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
@mixin textStyle {
  position: absolute;
  left: 42px;
  font-size: 17px;
  font-weight: bold;
  color: #4378db;
}
.avatar {
  position: absolute;
  width: 100%;
  height: 300px;
  p {
    @include textStyle;
    top: 27px;
  }
  swiper {
    padding-top: 75px;
    width: 250px;
    height: 200px;
    margin: 0 auto;
    image {
      display: block;
      width: 150px;
      height: 150px;
      margin: 0 auto;
    }
  }
}
.nickName {
  position: absolute;
  width: 100%;
  top:384px;
  p {
    @include textStyle;
    top: 27px;
  }
  form {
    position: relative;
    width: 375px;
    height: 200px;
    top: 30px;
    input {
      border-bottom: 1px solid #000000;
      position: absolute;
      width: 150px;
      height: 40px;
      left: 42px;
      top: 30px;
    }
    .btn-area {
      position: relative;
      top: 150px;
      height: 50px;
      width: 100%;
      text-align: center;
      button {
        display: block;
        width: 200px;
      }
    }
  }
}
</style>