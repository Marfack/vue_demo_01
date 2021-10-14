<template>
  <div id="spot-monthly-line" style="width: 70%; height: 500px; margin: auto; margin-top: 100px; margin-bottom: 200px"></div>
</template>

<script>
export default {
  name: 'SpotMonthlyLine',
  data() {
    return {
      option: {
        title: {
          text: '折线图-百度指数信息',
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
        legend: {
          orient: 'vertical',
          x: 'right',
          y: 'center'
        },
        xAxis: {
          data: this.time
        },
        yAxis: {
        },
        series: this.spotMonthlyLine
      }
    }
  },
  props: {
    time: Array,
    spotMonthlyLine: Array
  },
  mounted() {
    this.$echarts.init(document.getElementById('spot-monthly-line')).setOption(this.option)
  }
}
</script>

<style>

</style>