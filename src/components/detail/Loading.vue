<template>
  <vue-content-loading :width="300" :height="100">
    <circle cx="30" cy="30" r="30" />
    <rect x="75" y="13" rx="4" ry="4" width="100" height="15" />
    <rect x="75" y="37" rx="4" ry="4" width="50" height="10" />
  </vue-content-loading>
</template>

<script>
import VueContentLoading from 'vue-content-loading'

export default {
  components: {
    'vue-content-loading': VueContentLoading
  },
  props:['loading'],
  data () {
    return {
      loading: false
    }
  },
  watch:{
    commits: {
      handler: function(curVal, oldVal) {
        if(curVal != oldVal){
          this.loading = loading
        }
      }
    }
  }
}

</script>
<style scoped>
.product-echarts {
  width: 300px;
  height: 180px;
}

</style>
