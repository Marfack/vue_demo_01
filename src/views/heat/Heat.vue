<template>
  <el-scrollbar>
    <div class="views" v-if="!$store.state.loading">
      <china-map :spotSearchIndex="spotSearchIndex"></china-map>
      <spot-monthly-line :time="time" :spotMonthlyLine="spotMonthlyLine" :max="Math.max(spotMonthlyIndex)"></spot-monthly-line>
      {{ spotBaiduTagSentiment }}<br /><br />
      {{ spotBaiduTagWordcloud }}
    </div>
  </el-scrollbar>
</template>

<script>
import ChinaMap from './charts/ChinaMap'
import SpotMonthlyLine from './charts/SpotMonthlyLine'
import { getDataById } from '@/network/heatData'

export default {
  name: 'Heat',
  components: {
    ChinaMap,
    SpotMonthlyLine
  },
  data() {
    return {
      index: 3,
      data: []
    }
  },
  props: {
    spots: Array,
    reload: Boolean
  },
  computed: {
    spotSearchIndex: {
      get() {
        return this.data[0].map(item => {
          return {
            name: item.province_name,
            value: parseInt(item.nums)
          }
        })
      }
    },
    spotMonthlyIndex: {
      get() {
        return this.data[1]
      }
    },
    spotBaiduTagSentiment: {
      get() {
        return this.data[2]
      }
    },
    spotBaiduTagWordcloud: {
      get() {
        return this.data[3]
      }
    },
    time: {
      get() {
        const time = []
        for (let i = 1; i <= 12; i++) {
          time.push(i + '月')
        }
        return time
      }
    },
    spotMonthlyLine: {
      get() {
        return [
          {
            name: '媒体指数',
            type: 'line',
            data: this.spotMonthlyIndex[0],
            itemStyle: {
              color: '#CC4444'
            }
          },
          {
            name: '咨询指数',
            type: 'line',
            data: this.spotMonthlyIndex[1],
            itemStyle: {
              color: '#44CC44'
            }
          },
          {
            name: '搜索指数',
            type: 'line',
            data: this.spotMonthlyIndex[2],
            itemStyle: {
              color: '#4444CC'
            }
          },
        ]
      }
    }
  },
  methods: {
    getData() {
      this.flag = false
      this.data.splice(0, this.data.length)
      this.$store.dispatch('asyncSetLoading', true)
      this.$store.dispatch('asyncChangeCurrentView', this.index)
      getDataById(this.spots[this.$store.state.currentSpotIndex].id).then(res => {
        for (let data of res) {
          data = data.data
          if (data.status != 200) {
            this.$router.push('/404')
          }
          this.data.push(data.data)
        }
        this.$store.dispatch('asyncSetLoading', false)
      })
    }
  },
  watch: {
    reload() {
      this.getData()
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style>
.views {
  padding: 80px 100px 400px 100px;
}
</style>