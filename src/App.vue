<script>
export default {
  methods: {
    //判断新老用户
    oldUser() {
      let ui = wx.getStorageSync("ui");
      if (!ui.openId) {
        wx.navigateTo({
          url: "/pages/index/main",
        });
      } else {
        wx.switchTab({
          url: "/pages/dude/main",
        });
      }
    },
  },
  created() {
    this.oldUser();
  },
};
</script>

<style>
page {
  height: 100%;
  background: #f0f0f0;
}
</style>