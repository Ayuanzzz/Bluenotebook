<template>
  <div class="container">
        <navBar :name="navName"></navBar>
    <div class="card"></div>
    <div class="dudeList"></div>
  </div>
</template>

<script>
import navBar from "@/components/navBar";
export default {
  components: {
    navBar
  },
  data(){
    return{
      navName: "小本子",
    }
  }
  }
</script>

<style lang='scss'>

</style>