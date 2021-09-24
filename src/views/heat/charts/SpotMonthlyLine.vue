<template>
  <div id="spot-monthly-line" style="width: 600px; height: 400px; margin: auto"></div>
</template>

<script>
export default {
  name: 'SpotMonthlyLine',
  data() {
    return {
      option: {
        title: {
          text: '折线图-百度指数信息'
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
            max: this.max
        },
        series: this.spotMonthlyLine
      }
    }
  },
  props: {
    time: Array,
    spotMonthlyLine: Array,
    max: Number
  },
  mounted() {
    this.$echarts.init(document.getElementById('spot-monthly-line')).setOption(this.option)
  }
}
</script>

<style>

</style>