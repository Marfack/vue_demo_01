<template>
  <div>
    <nav-bar :spots="spots" @spotChanged="getData"></nav-bar>
    <tab-bar></tab-bar>
    <container :spots="spots" :loading="$store.state.loading" :reload="reload"></container>
  </div>
</template>

<script>
import NavBar from './navbar/NavBar'
import TabBar from './tabbar/TabBar'
import Container from './container/Container'
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
      reload: false
    }
  },
  methods: {
    getData() {
      this.reload = !this.reload
    }
  }
}
</script>

<style>
</style>