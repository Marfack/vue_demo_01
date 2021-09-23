<template>
  <div id="china" style="width: 600px; height: 400px; margin: auto"></div>
</template>

<script>
import chinaMap from'@/assets/json/china.json'

export default {
  name: 'ChinaMap',
  data() {
    return {
      flag: false,
      option: {
        title: {
          text: '地图-百度搜索指数',
          x: 'center',
          textStyle: {
            fontsize: 24
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            var toolTiphtml = ''
            if (isNaN(params.value)) {
              toolTiphtml = params.name + "暂无数据"
            } else {
              toolTiphtml = params.name + '热度：' + params.value
            }
            return toolTiphtml;
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        visualMap: {
          show: true,
          type: 'piecewise',
          seriesIndex: [0],
          left: 'center',
          top: 'bottom',
          textStyle: {
            color: '#000000'
          }
        },
        geo: {
          show: true,
          map: 'china',
          label: {
            normal: {
              show: true,
              fontsize: 12,
            },
            emphasis: {
              show: false,
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#FFFFFF',
              borderColor: '#666666'
            },
            emphasis: {
              areaColor: '#0099CC',
            }
          }
        },
        series: {
          type: 'map',
          map: 'china',
          geoIndex: 0,
          animation: false,
          data: this.spotSearchIndex
        }
      }
    }
  },
  props: {
    spotSerchIndex: Array
  },
  mounted() {
    this.$echarts.registerMap('china', chinaMap)
    new Promise(resolve => {
      resolve(this.spotSearchIndex)
    }).then((d) => {
      console.log(d);
      this.$echarts.init(document.getElementById('china')).setOption(this.option)
    })
  }
}
</script>

<style>
</style>