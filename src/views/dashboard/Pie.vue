<template>
  <div :id="id"></div>
</template>

<script>
import { Pie } from '@antv/g2plot'
export default {
  name: 'Pie',
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
      pie: undefined,
      count: 0
    }
  },
  watch: {
    data: function (newVal) {
      this.count++
      if (this.count > 1) {
        this.pie.changeData(newVal)
      } else {
        this.renderData(newVal)
      }
    }
  },
  methods: {
    renderData (data) {
      this.pie = new Pie(this.id, {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
          type: 'outer',
          content: '{name} {percentage}'
        },
        interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }]
      })
      this.pie.render()
    }
  }
}
</script>

<style scoped>

</style>
