<template>
  <div id="chart1" style="width: 600px; height: 400px; margin: auto"></div>
</template>

<script>
export default {
  name: 'SporAvgScore',
  data() {
    return {
      option: {
        color: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C'],
        title: {
          text: '雷达图-月度评分'
        },
        legend: {},
        radar: [
          {
            indicator: [
              { text: '景色' },
              { text: '有趣度' },
              { text: '性价比' }
            ],
            center: ['50%', '50%'],
            radius: 120,
            startAngle: 90,
            splitNumber: 4,
            shape: 'circle',
            axisName: {
              formatter: '{value}',
              color: '#428BD4'
            },
            splitArea: {
              areaStyle: {
                color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowBlur: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(211, 253, 250, 0.8)'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(211, 253, 250, 0.8)'
              }
            }
          }
        ],
        series: [
          {
            type: 'radar',
            emphasis: {
              lineStyle: {
                width: 4
              }
            },
            data: this.spotAvgScore
          }
        ]
      }
    }
  },
  props: {
    spotAvgScore: Array
  },
  mounted() {
    this.$echarts.init(document.getElementById('chart1')).setOption(this.option)
  }
}
</script>

<style>
</style>