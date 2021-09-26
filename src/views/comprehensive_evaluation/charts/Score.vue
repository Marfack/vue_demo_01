<template>
  <div id="chart4" style="width: 600px; height: 400px; margin: auto"></div>
</template>

<script>
export default {
  name: 'Score',
  data() {
    return {
      option: {
        title: {
          text: '柱状图-平台评分信息',
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: this.platform
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.score,
            type: 'bar'
          }
        ]
      }
    }
  },
  props: {
    platform: Array,
    score: Array
  },
  mounted() {
    this.$echarts.init(document.getElementById('chart4')).setOption(this.option)
  }
}
</script>

<style>

</style>