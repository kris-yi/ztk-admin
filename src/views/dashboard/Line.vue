<template>
  <div :id="id"></div>
</template>

<script>
import { Line } from '@antv/g2plot'

export default {
  name: 'AntLine',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      line: undefined,
      count: 0
    }
  },
  watch: {
    data: function (newVal) {
      this.count++
      if (this.count > 1) {
        this.line.changeData(newVal)
      } else {
        this.renderData(newVal)
      }
    }
  },
  methods: {
    renderData (data) {
      this.line = new Line(this.id, {
        data,
        padding: 'auto',
        xField: 'time',
        yField: 'value',
        xAxis: {
          // type: 'timeCat',
          tickCount: 5
        },
        smooth: true,
        meta: {
          time: {
            alias: '时段'
          },
          value: {
            alias: '人次'
          }
        }
      })
      this.line.render()
    }
  }
}
</script>

<style scoped>

</style>
