<template>
<div class="container">
    <!-- 导航栏 -->
    <navBar></navBar>
    <div class="bar" :style="{height:barHeight}" v-if="showBar">
        <div class="wrap">
            <!-- 时间开光 -->
            <div class="time">
                <p>{{time}}</p>
                <switch :checked="switchChecked" @click="switchChange" />
            </div>
            <!-- 饼状图 -->
            <div class="chart">
                <mpvue-echarts :echarts="echarts" :onInit="onInit" canvasId="demo-canvas" />
            </div>
            <!-- 心情按钮 -->
            <div class="heart">
                <img src="/static/images/love.svg">
                <p>12</p>
            </div>
            <div class="heart" style="bottom:0px">
                <img src="/static/images/hate.svg">
                <p style="color:#515151;">12</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import navBar from '@/components/navBar';
import echarts from 'echarts'
import mpvueEcharts from 'mpvue-echarts'

let chart = null;

function initChart(canvas, width, height) {
    chart = echarts.init(canvas, null, {
        width: width,
        height: height
    });
    canvas.setChart(chart);

    var option = {
        title: {
            // text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        series: [{
            type: 'pie',
            radius: '55%',
            data: [{
                    name: 'happy',
                    value: 52
                },
                {
                    name: 'sad',
                    value: 70
                }
            ]
        }]
    };

    chart.setOption(option);

    return chart; // 返回 chart 后可以自动绑定触摸操作
}
export default {
    components: {
        navBar,
        mpvueEcharts
    },
    data() {
        return {
            showBar: false,
            barHeight: '',
            time: '34天',
            switchChecked: true,
            echarts,
            onInit: initChart,
            switch1Checked: true,
        }
    },
    methods: {
        switchChange() {
            this.switchChecked = !this.switchChecked;
            if (this.switchChecked) {
                this.time = '34天'
            } else {
                this.time = '已结束'
            }
        },
        barShow() {
            if (this.barHeight) {
                this.showBar = true;
            }
        }
    },
    mounted() {
        this.barHeight = this.globalData.barHeight;
        this.barShow();
    },

}
</script>

<style>
.container {
    position: relative;
    background-color: #f2f5f8;
    width: 100%;
    height: 100%;
}

.bar {
    position: absolute;
    width: 100%;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrap {
    position: relative;
    width: 254px;
    height: 549px;
    display: flex;
    justify-content: center;
}

.time {
    width: 100%;
    height: 32px;
    display: flex;
    justify-content: space-between;
}

.time p {
    font-family: PingFang HK;
    font-size: 22.92px;
    line-height: 32px;
    color: rgba(0, 0, 0, 0.4);
}

.chart {
    border: 1px solid red;
    position: absolute;
    width: 250px;
    height: 250px;
    top: 80px;
}
.echarts-wrap {
  width: 250px;
  height: 250px;
}
.heart {
    position: absolute;
    width: 212px;
    height: 45px;
    bottom: 97px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.heart img{
    width: 34px;
    height: 34px;   
}
.heart p{
    font-family: PingFang HK;
    font-size: 24px;
    color: #F95050;
}
</style>
