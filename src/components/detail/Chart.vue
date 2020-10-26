<template>
<v-chart :options="bar" class="product-echarts"/>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import { constants } from 'zlib';

export default {
  components: {
    'v-chart': ECharts
  },
  props:['commits', 'dates'],
  data () {
    return {
      bar: {}
    }
  },
  methods: {
    draw: function(data, dates) {
      let options = {
        title: {
          text: '极坐标双数值轴'
        },
        legend: {},
        tooltip: {},
        xAxis: { type: 'category' },
        yAxis: {
          name: 'commit数'
        },
        series: [{
            type: 'bar',
            itemStyle: {
                color: new ECharts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#83bff6'},
                        {offset: 0.5, color: '#188df0'},
                        {offset: 1, color: '#188df0'}
                    ]
                )
            },
            emphasis: {
                itemStyle: {
                    color: new ECharts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
            data: []
          }],
        animationDuration: 2000
      }
      options.series[0].data = data
      options.xAxis.data = dates
      this.bar = options
    }
  },
  created() {
    this.draw(this.commits, this.dates)
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
  width: 260px;
  height: 220px;
}

</style>
