<template>
  <div class="selectContent">
    <div>
      <div class="reset" @click="reset">
        <i class="el-icon-refresh-right"></i>
        重置过滤条件
      </div>
      <Select v-for="(item, index) in this.$store.state.filterData" :data="item" :key="index"></Select>
    </div>
    <div>
      <div>过滤器示例</div>
      <el-tag v-for="(tag, index) in this.$store.state.tagsData" :key="index" class="tag" @click="useTags(tag)">{{ tag.title }}</el-tag>
    </div>
    <div class="download_container">
      <a :href="`${path}landscape.pdf`" download="新生态图.pdf" class="download">
        <i class="el-icon-download"></i>
        下载 CNIA 云原生全景图
      </a>
    </div>
  </div>
</template>

<script>
import Select from '@/components/SelectGroup.vue'

export default {
  components: {
    Select
  },
  data() {
    return {
      path:process.env.BASE_URL
    }
  },
  methods: {
    reset() {
      this.$store.commit('resetFilters')
    },
    useTags(tag) {
      this.$store.commit('useTag', tag)
    }
  }
}
</script>

<style scoped>
.selectContent {
  text-align: left;
  padding: 6px 8px;
  font-size: 14px;
}

.reset {
  margin-bottom: 10px;
  color: #4780b8;
  cursor: pointer;
}

.tag {
  margin-right: 8px;
  margin-bottom: 6px;
  margin-top: 6px;
  cursor: pointer;
}

.download_container {
  margin-top: 10px;
}

.download {
  text-decoration: none;
  color: #4780b8;
}
</style>