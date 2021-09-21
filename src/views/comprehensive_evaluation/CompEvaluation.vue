<template>
  <el-scrollbar>
    <div class="views">
      {{datas}}
    </div>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'CompEvaluation',
  data() {
    return {
      index: 2
    }
  },
  props: {
    datas: Array
  },
  created() {
    this.$store.dispatch('asyncChangeCurrentView', this.index)
  }
}
</script>

<style>
.views {
  padding: 80px 100px 200px 100px
}
</style>