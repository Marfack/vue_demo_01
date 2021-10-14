<template>
  <div id="wordcloud"></div>
</template>

<script>
import "echarts-wordcloud/dist/echarts-wordcloud.min.js"
export default {
  name: 'WordCloud',
  data() {
    return {
      option: {
        title: {
          text: '热词词频统计',
          x: 'center'
        },
        tooltip: {
          show: true
        },
        series: [{
          name: '词频统计',
          type: 'wordCloud',
          shape: 'smooth',
          sizeRange: [6, 66],
          gridSize: 8,
          size: ['100%', '100%'],
          rotationRange: [-45, 90],
          textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            color: function () {
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')';
            }
          },
          left: 'center',
          top: 'center',
          right: null,
          bottom: null,
          width: '100%',
          height: '100%',
          data: this.wordFrequency
        }]
      }
    }
  },
  props: {
    wordFrequency: Array
  },
  mounted() {
    this.$echarts.init(document.getElementById('wordcloud')).setOption(this.option)
  }
}
</script>

<style>
#wordcloud {
  height: 450px;
  width: 450px;
  text-align: center;
  margin: auto;
}
</style>