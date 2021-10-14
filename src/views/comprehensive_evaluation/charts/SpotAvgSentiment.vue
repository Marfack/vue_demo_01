<template>
  <div id="chart3" style="width: 600px; height: 400px; margin: auto"></div>
</template>

<script>
export default {
  name: 'AvgScore',
  data() {
    return {
      option: {
        title: {
          text: '柱状图-月度情感值信息',
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
            data: this.spotAvgSentiment,
            type: 'bar'
          }
        ]
      }
    }
  },
  props: {
    time: Array,
    spotAvgSentiment: Array
  },
  mounted() {
    this.$echarts.init(document.getElementById('chart3')).setOption(this.option)
  }
}
</script>

<style>
</style>