<template>
  <el-scrollbar>
    <div class="views" v-if="!$store.state.loading">
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>话题热榜</span>
          </div>
        </template>
        <div v-for="(item, index) in topicFrequency" :key="index" class="text item" style="display: flex">
          <span style="text-align: left; flex: 7; width: 100%">
            <el-tag :type="tag[index % 4]">{{item.topic}}</el-tag>
          </span>
          <span style="text-align: right; flex: 3; width: 100%; font-size: 12px; padding-top: 8px">{{item.count}}</span>
        </div>
      </el-card>
      <div v-for="(item, index) in commentInfo" :key="index">
        <el-card class="comment-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <h4>{{item.comment}}</h4>
            </div>
          </template>
          <div class="user-info">
            <div style="flex: 5" />
            <div style="flex: 2">{{item.name}}</div>
            <div style="flex: 1">
              <span style="color: gold" v-if="item.role == '黄金贵宾'">{{item.role}}</span>
              <span style="color: skyblue; font-weight: bold" v-else-if="item.role == '铂金贵宾'">{{item.role}}</span>
              <span style="color: purple; font-weight: bold" v-else-if="item.role == '钻石贵宾'">{{item.role}}</span>
              <span v-else>{{item.role}}</span>
            </div>
            <div style="flex: 2">{{item.time[0]}}&nbsp;&nbsp;{{item.time[1]}}</div>
          </div>
        </el-card>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import {getDataById} from '@/network/userEvaluationData'

export default {
  name: 'UserEvaluation',
  data() {
    return {
      index: 1,
      data: [],
      tag: [
        'danger',
        'warning',
        'success',
        'info'
      ]
    }
  },
  props: {
    spots: Array,
    reload: Boolean
  },
  computed: {
    topicFrequency: {
      get() {
        return this.data[0].topic_frequency
      }
    },
    commentInfo: {
      get() {
        return this.data[1].comment_info.map((item => {
          return {
            time: item[2].split('T'),
            phone: item[3],
            name: item[4],
            role: item[5] != null ? item[5] : '普通游客',
            comment: item[6]
          }
        }))
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

<style scoped>
.views {
  padding: 20px 100px 200px 100px
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

h4 {
	margin: 1em 0 0.5em 0;
	font-weight: 600;
	font-family: 'Titillium Web', sans-serif;
	position: relative;
	font-size: 18px;
	line-height: 23px;
	color: #646a74;
	font-family: 'Muli', sans-serif;
}

.user-info {
  display: flex;
  height: 15px;
  margin: 0;
  padding: 0;
  font-size: 15px;
  text-align: right;
  color: gray;
}
</style>