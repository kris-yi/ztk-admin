<template>
  <div :id="id"></div>
</template>

<script>
import { Column } from '@antv/g2plot'
export default {
  name: 'Column',
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
      column: undefined,
      count: 0
    }
  },
  watch: {
    data: function (newVal) {
      this.count++
      if (this.count > 1) {
        this.column.changeData(newVal)
      } else {
        this.renderData(newVal)
      }
    }
  },
  methods: {
    renderData (data) {
      this.column = new Column(this.id, {
        data,
        xField: 'type',
        yField: 'sales',
        label: {
          // 可手动配置 label 数据标签位置
          position: 'middle', // 'top', 'bottom', 'middle',
          // 配置样式
          style: {
            fill: '#FFFFFF',
            opacity: 0.6
          }
        },
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false
          }
        },
        meta: {
          type: {
            alias: '类别'
          },
          sales: {
            alias: '数量'
          }
        }
      })
      this.column.render()
    }
  }
}
</script>

<style scoped>

</style>
