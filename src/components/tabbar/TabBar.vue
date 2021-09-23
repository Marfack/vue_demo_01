<template>
  <div class="tab-bar">
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
      @select="handleSelect"
      background-color="rgb(56, 122, 184)"
      text-color="#fff"
      active-text-color="rgb(229, 195, 155)"
    >
      <div style="width: 40px"></div>
      <el-menu-item style="height: 100px; width: 220px; text-align: center; font-size: 22px; padding-top: 20px" index="/">乡村画像</el-menu-item>
      <div style="width: 40px"></div>
      <el-menu-item style="height: 100px; width: 220px; text-align: center; font-size: 22px; padding-top: 20px" index="/user_evaluation">游客评价</el-menu-item>
      <div style="width: 40px"></div>
      <el-menu-item style="height: 100px; width: 220px; text-align: center; font-size: 22px; padding-top: 20px" index="/comp_evaluation">综合评估</el-menu-item>
      <div style="width: 40px"></div>
      <el-menu-item style="height: 100px; width: 220px; text-align: center; font-size: 22px; padding-top: 20px" index="/heat">媒体热度</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
    }
  },
  methods: {
    handleSelect() {
      this.$emit('viewChanged')
    }
  }
}
</script>

<style>
.tab-bar {
  display: block;
  height: 100px;
  position: fixed;
  top: 52px;
  left: 0px;
  right: 0px;
}

.el-menu-demo {
  height: 100px;
  line-height: 100px;
}
</style>