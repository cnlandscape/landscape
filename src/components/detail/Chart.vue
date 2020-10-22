<template>
<v-chart :options="bar" class="product-echarts"/>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'

export default {
  components: {
    'v-chart': ECharts
  },
  props:['commits'],
  data () {
    return {
      bar: {}
    }
  },
  methods: {
    draw: function(data) {
      let options = {
        title: {
          text: '极坐标双数值轴'
        },
        legend: {},
        tooltip: {},
        xAxis: { type: 'category' },
        yAxis: {},
        series: [{
          data: [],
          type: 'bar'
        }],
        animationDuration: 2000
      }
      options.series[0].data = data
      this.bar = options
    }
  },
  created() {
    this.draw(this.commits)
  },
  watch:{
    commits: {
      deep: true,
      handler: function(curVal, oldVal) {
        if(curVal != oldVal){
          this.commits = curVal
          this.draw(this.commits)
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
