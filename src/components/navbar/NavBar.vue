<template>
  <bar-body>
    <template v-slot:left>
      <el-dropdown class="menu">
        <div class="el-dropdown-link">
          <i
            class="el-icon-s-operation"
            style="color: #fff; margin: 0 5px 0 0; font-size: 16px"
          ></i>
          <li>选择景点</li>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(item, index) in spots" :key="index" @click="changeSpot(index)">{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
    <template v-slot:center>
      <img :src="logo" alt="logo" />
    </template>
    <template v-slot:right> </template>
  </bar-body>
</template>

<script>
import BarBody from './BarBody'

export default {
  name: 'NavBar',
  components: {
    BarBody
  },
  data() {
    return {
      logo: require('../../assets/img/logo.png')
    }
  },
  props: {
    spots: Array
  },
  methods: {
    changeSpot(index) {
      this.$store.dispatch('asyncChangeCurrentSpot', index)
      this.$emit('spotChanged')
    }
  }
}
</script>

<style>
.menu {
  width: 100%;
  height: 50px;
  margin: 0;
}

.el-dropdown-link {
  width: 100%;
  height: 50px;
  cursor: pointer;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.el-dropdown-link li {
  display: inline-block;
  color: #fff;
  font-size: 15px;
  margin-top: 15px;
}
</style>