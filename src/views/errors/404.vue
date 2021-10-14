<template>
  <div>
    <el-empty description=" " style="padding-top: 200px">
      <h1>404 Not Found</h1>
      <p>对不起，您请求的数据丢失了。</p>
    </el-empty>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  created() {
    this.$store.dispatch('asyncSetLoading', false)
  }
}
</script>

<style>

</style>