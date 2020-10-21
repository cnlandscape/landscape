<template>
  <div class="home">
    <p class="title">CNIA 中国云原生技术生态图景 Beta
    </p>
    <div class="line"></div>
    <p class="subTitle">
      CNIA 中国云原生技术生态图景是 CNIA 推荐的 Cloud Native 景观的路径，云原生应用，云原生编排及管理，云原生底层技术，云原生安全技术
    </p>
    <p class="intro">您正在查看 {{this.$store.state.total}}  张卡</p>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(items, _) in this.$store.state.info.landscape" :key="items.category" :label="items.category" :name="items.category" >
        <Items :category="items"></Items>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Items from '@/components/Items.vue'

export default {
  name: 'Home',
  components: {
    Items
  },
  data() {
    return {
      activeName: "云原生应用"
    }
  },
  methods: {
    toDetail(project) {
      this.$router.push({ path: `/detail/${project.id}` }) 
    },
    handleClick(tab) {
      this.activeName = tab.name
    }
  }
}
</script>

<style scoped>
.home {
  text-align: left;
}

.title {
  font-size: 34px;
  margin: 0;
}

.line {
  height: 2px;
  background: linear-gradient(to right, #38fbfb, #5a5ac8);
  width: 80%;
}

.subTitle {
  font-size: 14px;
}

.intro {
  font-weight: 600;
}

.info_card {
  margin-bottom: 20px;
  background-color: grey;
}
</style>