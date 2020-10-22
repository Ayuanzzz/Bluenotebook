<template>
  <div>
    <div>
      <p>
        与
        <span>
          <img src="/static/images/p2.png" />
        </span>在一起
      </p>
      <p>第12天</p>
    </div>
    <p>*************************************************************</p>
    <p>Timer</p>
    <switch  @change="switch1Change"></switch>
    <p>*************************************************************</p>
    <div>
      <p>今日心情</p>
      <p>
        <img src="/static/images/smile.png" />
      </p>
    </div>
    <p>*************************************************************</p>
    <div>
      <p>统计图表</p>
      <div class="echarts-wrap">
        <mpvue-echarts :echarts="echarts" :onInit="onInit" canvasId="demo-canvas" />
      </div>
    </div>
  </div>
</template>

<script>
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
        // center:['20%',100],
        radius:'55%',
        data: [
            {name:'happy',value:52},
            {name:'peace',value:54},
            {name:'sad',value:70}
        ]
      }]
    };

    chart.setOption(option);

    return chart; // 返回 chart 后可以自动绑定触摸操作
}

export default {
    components: {
        mpvueEcharts
    },
    data() {
        return {
            echarts,
            onInit: initChart,
            switch1Checked: true,
        }
    }
}
</script>

<style>
img {
  width: 40px;
  height: 40px;
}
.echarts-wrap {
  width: 100%;
  height: 300px;
}
</style>
