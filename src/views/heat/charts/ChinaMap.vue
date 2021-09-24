<template>
  <div id="china" style="width: 100%; height: 850px; margin: auto"></div>
</template>

<script>
export default {
  name: 'ChinaMap',
  data() {
    return {
    }
  },
  props: {
    spotSearchIndex: Array,
  },
  computed: {
    option: {
      get() {
        return {
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
              let toolTiphtml = ''
              if (isNaN(params.value)) {
                toolTiphtml = params.name + "暂无数据"
              } else {
                toolTiphtml = params.name + '\n热度：' + params.value
              }
              return toolTiphtml
            },
            extraCssText:'width:100px;height:26px;'
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          visualMap: {
            min: 0,
            max: 600,
            show: true,
            type: 'piecewise',
            left: 'right',
            top: 'center',
            textStyle: {
              color: '#000000'
            }
          },
          geo: {
            show: true,
            map: 'china',
            label: {
              show: true,
              fontsize: 12
            },
            roam: false,
            emphasis: {
              itemStyle: {
                areaColor: '#0099CC'
              },
              label: {
                show: true,
              }
            },
            itemStyle: {
              areaColor: '#FFFFFF',
              borderColor: '#666666'
            }
          },
          series: [{
            data: this.spotSearchIndex,
            type: 'map',
            map: 'china',
            geoIndex: 0,
            animation: false
          }]
        }
      }
    }
  },
  mounted() {
    this.$echarts.init(document.getElementById('china')).setOption(this.option)
  }
}
</script>

<style>
</style>