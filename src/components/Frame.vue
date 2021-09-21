<template>
  <div>
    <nav-bar :spots="spots" @spotChanged="getData"></nav-bar>
    <tab-bar></tab-bar>
    <container :datas="datas" :loading="loading"></container>
  </div>
</template>

<script>
import NavBar from './navbar/NavBar'
import TabBar from './tabbar/TabBar'
import Container from './container/Container'
import {getDataById} from '../network/data'
import spots from '@/assets/json/spots.json'

export default {
  name: 'Frame',
  components: {
    NavBar,
    TabBar,
    Container
  },
  data() {
    return {
      spots,
      datas: [],
      loading: true
    }
  },
  methods: {
    getData() {
      this.datas.splice(0,this.datas.length)
      getDataById(this.spots[this.$store.state.currentSpotIndex].id).then(res => {
        for (let i = 0; i < 10; i++) {
          let v = res[i].data
          if (v.status != 200) {
            this.$route.push('/404')
            break
          }
          v = v.data
          if (i === 0 || i === 2 || i === 6 || i === 8) {
            this.datas.push([v])
          } else if (i === 1) {
            this.datas[0].push(v)
          } else if (i < 6) {
            this.datas[1].push(v)
          } else if (i == 7) {
            this.datas[2].push(v)
          } else {
            this.datas[3].push(v)
          }
        }
        this.loading = false
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style>
</style>