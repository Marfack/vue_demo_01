<template>
  <div id="chart2" style="width: 600px; height: 400px; margin: auto"></div>
</template>

<script>
export default {
  name: 'AvgScore',
  data() {
    return {
      option: {
        title: {
          text: '柱状图-月度综合平均得分',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {},
        xAxis: {
          type: 'category',
          data: this.time
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.avgScore,
            type: 'bar'
          }
        ]
      }
    }
  },
  props: {
    time: Array,
    avgScore: Array
  },
  mounted() {
    this.$echarts.init(document.getElementById('chart2')).setOption(this.option)
  }
}
</script>

<style>
</style>