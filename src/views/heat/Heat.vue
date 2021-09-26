<template>
  <el-scrollbar>
    <div class="views" v-if="!$store.state.loading">
      <china-map :spotSearchIndex="spotSearchIndex"></china-map>
      <spot-monthly-line :time="time" :spotMonthlyLine="spotMonthlyLine"></spot-monthly-line>
      <word-cloud :wordFrequency="wordFrequency"></word-cloud>
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header; display: flex">
            <span style="flex: 6; width: 100%; margin-right: 20px">评论观点</span>
            <span style="flex: 2; width: 100%">
              <el-button plain icon="el-icon-arrow-left" @click="changeIndex(false)"></el-button>
            </span>
            <span style="flex: 2; width: 100%">
              <el-button plain icon="el-icon-arrow-right" @click="changeIndex(true)"></el-button>
            </span>
          </div>
        </template>
        <div v-for="index in ((currentIndex === maxIndex) ? (spotBaiduTagSentiment.length - currentIndex * 10) : 10)" :key="index" class="text item" style="display: flex">
          <span style="text-align: left; flex: 6; width: 100%">
            <el-tag :type="tag[index % 4]">{{spotBaiduTagSentiment[currentIndex * 10 + index][0]}}</el-tag>
          </span>
          <span style="text-align: left; flex: 2; width: 100%; font-size: 12px; padding-top: 8px">
            <img src="../../assets/img/icon/赞.png" style="width: 15px;" />
            {{spotBaiduTagSentiment[currentIndex * 10 + index][1]}}
          </span>
          <span style="text-align: left; flex: 2; width: 100%; font-size: 12px; padding-top: 8px; padding-left: 10px">
            <img src="../../assets/img/icon/踩.png" style="width: 15px; margin-top: 4px" />
            {{spotBaiduTagSentiment[currentIndex * 10 + index][2]}}
          </span>
        </div>
      </el-card>
    </div>
  </el-scrollbar>
</template>

<script>
import ChinaMap from './charts/ChinaMap'
import SpotMonthlyLine from './charts/SpotMonthlyLine'
import WordCloud from './charts/WordCloud'
import { getDataById } from '@/network/heatData'

export default {
  name: 'Heat',
  components: {
    ChinaMap,
    SpotMonthlyLine,
    WordCloud
  },
  data() {
    return {
      index: 3,
      data: [],
      tag: [
        'danger',
        'warning',
        'success',
        'info'
      ],
      currentIndex: 0
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
        return this.data[1].map(item => {
          return item.map(i => {
            return parseInt(i)
          })
        })
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
    wordFrequency: {
      get() {
        return this.spotBaiduTagWordcloud.map(item => {
          return {
            name: item[1],
            value: item[2]
          }
        })
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
    },
    maxIndex: {
      get() {
        return this.spotBaiduTagSentiment.length / 10 - 2
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
          if (data.status == 404) {
            this.$router.push('/404')
            break
          } else if (data.status == 403) {
            this.$router.push('/403')
            break
          }
          this.data.push(data.data)
        }
        this.$store.dispatch('asyncSetLoading', false)
      })
    },
    changeIndex(flag) {
      if (flag) {
        if (this.currentIndex < this.maxIndex){
          this.currentIndex++
        }
      } else {
        if (this.currentIndex > 0) {
          this.currentIndex--
        }
      }
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
  padding: 80px 100px 100px 100px;
}

.box-card {
  width: 13%;
  position: fixed;
  top: 240px;
  right: 42px;
}
</style>