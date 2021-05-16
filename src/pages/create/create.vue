<template>
  <div class="container">
    <navBar :name="navName"></navBar>
    <div class="profile">
      <p>选择头像</p>
      <swiper class="swiper" indicator-dots="true" circular="true" @change="switchItem('switchItem',$event)" >
        <block v-for="(item, index) in profile" :key="index">
          <swiper-item>
            <image :src="itemImg_path + item" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="nickName">
      <p>昵称</p>
      <form catchsubmit="formSubmit" catchreset="formReset">
        <input
          class="weui-input"
          name="input"
          placeholder="最多输入6个字哦"
          maxlength="6"
        />
        <div class="btn-area">
          <button type="primary" formType="submit" @click="formSubmit(e)">
            创建
          </button>
        </div>
      </form>
    </div>
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
      itemImg_path: "/static/images/bigicon/",
      profile: [
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
      temp:""
    };
  },
  methods: {
    formSubmit(e) {
      console.log("form发生了submit事件，携带数据为：", e);
    },
    switchItem: function (prompt,res) {
      console.log(res);
      let count = res.mp.detail.current;
      this.temp = this.profile[count];
      console.log(this.temp);
    },
  },
  created() {},
};
</script>

<style lang='scss'>
.container {
  width: 100%;
}
p {
  position: absolute;
  left: 42px;
  font-size: 17px;
  font-weight: bold;
  color: #4378db;
}
.profile {
  position: relative;
  width: 100%;
  height: 300px;
  p {
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
  position: relative;
  width: 100%;
  p {
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