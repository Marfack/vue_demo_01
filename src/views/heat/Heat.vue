<template>
  <el-scrollbar>
    <div class="views" v-if="!$store.state.loading">
      <china-map :spotSearchIndex="spotSerchIndex"></china-map>
      {{spotSearchIndex}}<br/><br/>
      {{spotMonthlyIndex}}<br/><br/>
      {{spotBaiduTagSentiment}}<br/><br/>
      {{spotBaiduTagWordcloud}}
    </div>
  </el-scrollbar>
</template>

<script>
import ChinaMap from './ChinaMap'
import {getDataById} from '@/network/heatData'


export default {
  name: 'Heat',
  components: {
    ChinaMap
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
  }
}
</script>

<style>
.views {
  padding: 80px 100px 400px 100px
}
</style>