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
import mpvueEcharts from "mpvue-echarts";
import echarts from "../../../static/untils/echarts.min";

let chart = null;

function initChart(canvas, width, height) {
    chart = echarts.init(canvas, null, {
        width: width,
        height: height
    });
    canvas.setChart(chart);

    var option = {
        series: [{
            name: '面积模式',
            type: 'pie',
            radius: ['15%','75%' ],
            center: ['50%', '50%'],
            roseType: 'radius',
            label: {
                show:true,
                fontFamily:"sans-serif",
                fontSize: 16
            },
            itemStyle: { 
                normal: {
                    // 设置扇形的阴影
                    shadowBlur: 30,
                    shadowColor: 'rgba(0, 0, 0, 0.3)', 
                    shadowOffsetX: 5,
                    shadowOffsetY: 10

                }
            },
            data: [{
                    name: '52%',
                    value: 52,
                    color: '#F95050'
                },
                {
                    name: '70%',
                    value: 70,
                    itemStyle: {
                        color: '#515151'
                    }
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
            echarts,
            onInit: initChart,
            showBar: false,
            barHeight: '',
            time: '34天',
            switchChecked: true,
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
    width: 100%;
    height: 549px;
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
}

.time {
    width: 100%;
    height: 32px;
    display: flex;
    justify-content: space-around;
}

.time p {
    font-family: PingFang HK;
    font-size: 22.92px;
    line-height: 32px;
    color: rgba(0, 0, 0, 0.4);
}

.chart {
    position: absolute;
    width: 100%;
    height: 250px;
    top: 80px;
}

.echarts-wrap {
    width: 100%;
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

.heart img {
    width: 34px;
    height: 34px;
}

.heart p {
    font-family: PingFang HK;
    font-size: 24px;
    color: #F95050;
}
</style>
