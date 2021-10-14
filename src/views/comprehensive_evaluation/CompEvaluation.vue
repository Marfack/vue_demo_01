<template>
  <el-scrollbar>
    <div class="views" v-if="!$store.state.loading">
      <div class="demo-collapse">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="热词词频统计" name="1">
            <word-cloud :wordFrequency="wordFrequency"></word-cloud>
          </el-collapse-item>
          <el-collapse-item title="月度评分" name="2">
            <spot-avg-line
              :time="time"
              :spotAvgLine="spotAvgLine"
            ></spot-avg-line>
          </el-collapse-item>
          <el-collapse-item title="月度综合平均得分" name="3">
            <avg-score :time="time" :avgScore="avgScore"></avg-score>
          </el-collapse-item>
          <el-collapse-item title="月度情感值信息" name="4">
            <spot-avg-sentiment
              :time="time"
              :spotAvgSentiment="spotAvgSentiment"
            ></spot-avg-sentiment>
          </el-collapse-item>
        </el-collapse>
      </div>
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>景区评分</span>
          </div>
        </template>
        <el-table :data="score" style="width: 100%">
          <el-table-column prop="platform" label="平台" width="150" />
          <el-table-column prop="score" label="评分" width="50" />
        </el-table>
      </el-card>
      <!-- <spot-avg-score :spotAvgScore="avgViewScore"></spot-avg-score> -->
    </div>
  </el-scrollbar>
</template>

<script>
import WordCloud from './charts/WordCloud'
import SpotAvgScore from './charts/SpotAvgScore'
import AvgScore from './charts/AvgScore'
import SpotAvgSentiment from './charts/SpotAvgSentiment'
import Score from './charts/Score'
import SpotAvgLine from './charts/SpotAvgLine'
import { getDataById } from '@/network/compEvaluationData'
export default {
  name: 'CompEvaluation',
  components: {
    WordCloud,
    SpotAvgScore,
    AvgScore,
    SpotAvgSentiment,
    Score,
    SpotAvgLine
  },
  data() {
    return {
      index: 2,
      data: [],
      activeName: '1'
    }
  },
  props: {
    spots: Array,
    reload: Boolean
  },
  computed: {
    score: {
      get() {
        return this.data[0]
      }
    },
    wordFrequency: {
      get() {
        return this.data[1].word_frequency.map((item) => {
          return {
            name: item.word,
            value: item.count
          }
        })
      }
    },
    spotAvgScore: {
      get() {
        return this.data[2].monthly_score_info
      }
    },
    avgViewScore: {
      get() {
        return this.spotAvgScore.map(item => {
          return {
            name: item[0].substring(0, 4) + '-' + item[0].substring(4),
            value: [
              item[2],
              item[3],
              item[4]
            ]
          }
        })
      }
    },
    time: {
      get() {
        return this.spotAvgScore.map(item => {
          return item[0].substring(0, 4) + '-' + item[0].substring(4)
        })
      }
    },
    avgScore: {
      get() {
        return this.spotAvgScore.map(item => {
          return item[1]
        })
      }
    },
    spotAvgSentiment: {
      get() {
        return this.data[3].monthly_sentiment_info.map(item => {
          return item[1]
        })
      }
    },
    spotAvgLine: {
      get() {
        return [
          {
            name: '景色',
            type: 'line',
            data: this.spotAvgScore.map(item => {
              return item[2]
            }),
            itemStyle: {
              color: '#CC4444'
            }
          },
          {
            name: '有趣度',
            type: 'line',
            data: this.spotAvgScore.map(item => {
              return item[3]
            }),
            itemStyle: {
              color: '#44CC44'
            }
          },
          {
            name: '性价比',
            type: 'line',
            data: this.spotAvgScore.map(item => {
              return item[4]
            }),
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
  },
  mounted() {
  }
}
</script>

<style scoped>
.views {
  padding: 80px 100px 0 100px;
}

.box-card {
  width: 13%;
  position: fixed;
  top: 240px;
  right: 42px;
}

.el-card__body {
  height: 15px;
}

</style>