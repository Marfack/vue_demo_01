<template>
  <div id="chart5" style="width: 600px; height: 400px; margin: auto"></div>
</template>

<script>
export default {
  name: 'SporAvgScore',
  data() {
    return {
      option: {
        title: {
          text: '折线图-月度评分'
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
          data: this.time
        },
        yAxis: {
            min: 0,
            max: 5
        },
        series: this.spotAvgLine
      }
    }
  },
  props: {
    time: Array,
    spotAvgLine: Array
  },
  mounted() {
    this.$echarts.init(document.getElementById('chart5')).setOption(this.option)
  }
}
</script>

<style>
</style>