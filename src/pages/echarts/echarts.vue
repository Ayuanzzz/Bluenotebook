<template>
<div>
    <p>{{hours}}:{{minute}}:{{second}}</p>
    <button class="primary" @click="startTimer">start</button>
    <button class="primary" @click="resetTimer">reset</button>
    <button class="primary" @click="stopTimer">stop</button>
</div>
</template>

<script>
var init;
export default {
    data() {
        return {
            hours: '00',
            minute: '00',
            second: '00'
        }
    },
    methods: {
        timer() {
            const that = this;
            that.second++
            console.log(that.second);
            if (that.second >= 60) {
                that.second = '00';
                that.minute++;
                if (that.minute >= 60) {
                    that.minute = 0;
                    that.hours++;
                    if (that.hours < 10) {
                        that.hours = '0' + that.hours
                    }
                } else {
                    that.hours = that.hours
                }
            }
        },
        startTimer(){
          clearInterval(init)
          const that = this;
          init = setInterval(function(){
            that.timer()
          },1000)
        },
        stopTimer(){
          clearInterval(init)
        },
        resetTimer(){
          clearInterval(init);
          this.hours = '00';
          this.minute = '00';
          this.second = '00';
        }
    }
}


</script>

<style>

</style>
