<script>
export default {
  data(){
    return{
      // globalData:{},
    }
  },
  methods:{
    checkUser(){
      const ui = wx.getStorageSync('ui');
            if (ui.openId) {
                this.Avatar = ui.avatarUrl
            } else {
                console.log("turn");
            }
    }
  },
  onload(){
    this.checkUser()
    console.log("111");
  },
}
</script>

<style>
page{
  height:100%;
  background: #F0F0F0;
}
</style>