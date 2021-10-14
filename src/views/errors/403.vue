<template>
  <div>
    <el-empty description=" " style="padding-top: 200px">
      <h1>403 Forbidden</h1>
      <p>对不起，您没有访问权限。</p>
    </el-empty>
  </div>
</template>

<script>
export default {
  name: 'Forbidden',
  created() {
    this.$store.dispatch('asyncSetLoading', false)
  }
}
</script>

<style>

</style>