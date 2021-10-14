<template>
  <el-scrollbar>
    <div class="views" v-if="!$store.state.loading">
      <h1>{{spots[$store.state.currentSpotIndex].name}}</h1>
      <h3 v-if="openTime != undefined">开放时间: {{openTime}}</h3>
      <el-carousel :interval="4000" height="300px" type="card">
        <el-carousel-item v-for="(item, index) in images" :key="index">
          <img class="pictures" :src="item" />
        </el-carousel-item>
      </el-carousel>
      <div v-if="location.longitude.length > 0" style="text-align: right; font-weight: 100">
        <span>经度: {{location.longitude}}</span>
        <el-divider direction="vertical"></el-divider>
        <span>纬度: {{location.latitude}}</span>
      </div>
      <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{intro}}</h4>
    </div>
  </el-scrollbar>
</template>

<script>
import {getDataById} from '@/network/homeData'


export default {
  name: 'Home',
  data() {
    return {
      index: 0,
      data: []
    }
  },
  props: {
    spots: Array,
    reload: Boolean
  },
  computed: {
    location: {
      get() {
        return this.data[1].location
      }
    },
    openTime: {
      get() {
        return this.data[0].open_time
      }
    },
    intro: {
      get() {
        return this.data[0].intro
      }
    },
    images: {
      get() {
        return this.data[0].image_list.split(',')
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
  padding: 20px 100px 150px 100px
}

.pictures {
  width: 100%;
}

h1 {
	margin: 1em 0 0.5em 0;
	color: #343434;
	font-weight: normal;
	font-family: 'Ultra', sans-serif;   
	font-size: 36px;
	line-height: 42px;
	text-transform: uppercase;
	text-shadow: 0 2px white, 0 3px #777;
}

h3 {
	margin: 1em 0 0.5em 0;
	font-weight: 600;
	font-family: 'Titillium Web', sans-serif;
	position: relative;
	text-shadow: 0 -1px 1px rgba(0,0,0,0.4);
	font-size: 22px;
	line-height: 40px;
	color: #355681;
	text-transform: uppercase;
	border-bottom: 1px solid rgba(53,86,129, 0.3);
  text-align: right;
}

h4 {
	margin: 1em 0 0.5em 0;
	font-weight: 600;
	font-family: 'Titillium Web', sans-serif;
	position: relative;
	font-size: 18px;
	line-height: 20px;
	color: #788699;
	font-family: 'Muli', sans-serif;
}

</style>