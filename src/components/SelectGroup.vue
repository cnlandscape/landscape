<template>
  <div class="select_container">
    <div class="name">{{ data.title }}</div>
    <el-select v-model="value" multiple placeholder="请选择" size="small">
      <el-option
        v-for="item in data.options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
    // 接受父组件的值
  props: {
    data: Object,
  },
  computed: {
    value: {
      get() {
        return this.calcuFilter()
      },
      set(value) {
        let obj = {
          key: this.data.key,
          options: value
        }
        this.$store.commit('addFilter', obj)
        return value
      }
    }
  },
  methods: {
    calcuFilter() {
      let filters = this.$store.state.selectFilter
      let value = []
      for (let i = 0; i < filters.length; i++) {
        if (filters[i].key == this.data.key) {
          value = filters[i].options
        }
      }
      return value
    }
  }
}
</script>

<style scoped>
.select_container {
  margin-bottom: 10px;
}

.name {
  margin-bottom: 4px;
}
</style>