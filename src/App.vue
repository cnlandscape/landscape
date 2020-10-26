<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside></Aside>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'

export default {
  components: {
    Aside,
    Header
  },
  beforeMount() {
    this.$store.commit('initInfo', require('../public/data.json'))
    this.$store.commit('initFilter', require('../public/filter.json'))
  }
}
</script>

<style lang="less">
#app {
  font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,"Microsoft YaHei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 1240px;
  padding: 0px;
  margin: 0px;
}

.main {
  padding-top: 0px !important;
}
</style>
