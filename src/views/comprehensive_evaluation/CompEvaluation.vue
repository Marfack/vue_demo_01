<template>
  <el-scrollbar>
    <div class="views" v-if="!$store.state.loading">
      <word-cloud :wordFrequency="wordFrequency"></word-cloud>
      <score :platform="platform" :score="score"></score>
      <spot-avg-score :spotAvgScore="avgViewScore"></spot-avg-score>
      <avg-score :time="time" :avgScore="avgScore"></avg-score>
      <spot-avg-sentiment :time="time" :spotAvgSentiment="spotAvgSentiment"></spot-avg-sentiment>
    </div>
  </el-scrollbar>
</template>

<script>
import WordCloud from './charts/WordCloud'
import SpotAvgScore from './charts/SpotAvgScore'
import AvgScore from './charts/AvgScore'
import SpotAvgSentiment from './charts/SpotAvgSentiment'
import Score from './charts/Score'
import {getDataById} from '@/network/compEvaluationData'
export default {
  name: 'CompEvaluation',
  components: {
    WordCloud,
    SpotAvgScore,
    AvgScore,
    SpotAvgSentiment,
    Score
  },
  data() {
    return {
      index: 2,
      data: []
    }
  },
  props: {
    spots: Array,
    reload: Boolean
  },
  computed: {
    platform: {
      get() {
        return this.data[0].map(item => {
          return item.platform
        })
      }
    },
    score: {
      get() {
        return this.data[0].map(item => {
          return item.score
        })
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
    }
  },
  methods: {
    getData() {
      this.data.splice(0,this.data.length)
      this.$store.dispatch('asyncSetLoading', true)
      this.$store.dispatch('asyncChangeCurrentView', this.index)
      getDataById(this.spots[this.$store.state.currentSpotIndex].id).then(res => {
        for (let data of res) {
          data = data.data
          if (data.status != 200) {
            this.$route.push('/404')
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
  padding: 80px 100px 400px 100px;
}

</style>