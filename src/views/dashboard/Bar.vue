<template>
  <div :id="id"></div>
</template>

<script>
import { Bar } from '@antv/g2plot'
export default {
  name: 'Bar',
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
      bar: undefined,
      count: 0
    }
  },
  watch: {
    data: function (newVal) {
      this.count++
      if (this.count > 1) {
        this.bar.changeData(newVal)
      } else {
        this.renderData(newVal)
      }
    }
  },
  methods: {
    renderData (data) {
      this.bar = new Bar(this.id, {
        data,
        xField: 'value',
        yField: 'day',
        seriesField: 'day',
        legend: {
          position: 'top-left'
        }
      })
      this.bar.render()
    }
  }
}
</script>

<style scoped>

</style>
