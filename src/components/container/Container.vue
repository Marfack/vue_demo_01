<template>
  <div id="container">
    <div class="view" @click="f">
      <router-view :datas="datas[this.$store.state.currentViewIndex]" v-loading="loading"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Container',
  props: {
    datas: Array,
    loading: Boolean
  }
}
</script>

<style>
#container {
  width: 100%;
  height: 800px;
  background-image: url("../../assets/img/background/bgi.jpeg");
  background-size: 100% 100%;
  position: fixed;
  top: 151px;
  left: 0;
  right: 0;
  padding: 0;
}

.view {
  margin: auto;
  padding: 0;
  width: 65%;
  background-color: rgba(255, 255, 255, 0.7);
  height: 850px;
  margin-top: 1px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>