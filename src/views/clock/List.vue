<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col
              v-for="(item,index) in filter.columns"
              :key="index"
              :md="6">
              <a-form-item
                :label="item.label"
              >
                <a-input
                  v-if="item.type==='input'"
                  :placeholder="`请输入${item.label}`"
                  v-model="filter.data[item.prop]"
                />
                <a-select
                  v-if="item.type==='select'"
                  :placeholder="`请选择${item.label}`"
                  v-model="filter.data[item.prop]"
                >
                  <a-select-option
                    v-for="(selectItem,selectIndex) in item.option"
                    :key="selectIndex"
                    :value="selectItem.value"
                  >
                    {{ selectItem.label }}
                  </a-select-option>
                </a-select>
                <a-range-picker
                  v-if="item.type==='rangePicker'"
                  format="YYYY-MM-DD"
                  v-model="filter.data[item.prop]"
                />
              </a-form-item>
            </a-col>
            <a-col :md="24">
              <span
                class="table-page-search-submitButtons"
                :style="{float:'right',overflow:'hidden'}"
              >
                <a-button type="primary" @click="onSearch">查询</a-button>
                <a-button type="primary" style="margin-left: 8px" @click="onExport"> 导出 </a-button>
                <a-button style="margin-left: 8px" @click="onResetSearch">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <a-table
        :dataSource="tableData.list"
        :loading="tableData.loading"
        :columns="tableData.column"
        :pagination="tableData.pagination"
        :rowKey="(record,index)=>{return index}"
        @change="onChange"
      >
        <template slot="title">
          总数：{{ tableData.pagination.total }}
        </template>
        <template slot="img" slot-scope="text, record">
          <img
            v-if="record.img"
            :src="domain+record.img"
            width="100px"
          />
          <span v-else>无图片</span>
        </template>
        <template slot="inOrOut" slot-scope="text, record">
          <span v-if="record.in_or_out==='上岛'">岛方向</span>
          <span v-else-if="record.in_or_out==='离岛'">岸方向</span>
          <span v-else>未知</span>
        </template>
        <template slot="location" slot-scope="text, record">
          <a-button
            v-if="record.lng && record.lat"
            type="link"
            @click="onMap(record)"
          >
            点击查看
          </a-button>
          <span v-else>人工校准</span>
        </template>
      </a-table>
      <a-modal
        v-model="visible"
        title="地图"
        :footer="null"
        :width="800"
        :destroyOnClose="true"
      >
        <amap
          ref="map"
          style="width: 100%; height: 500px;"
          :zoom="map.zoom"
          :center="map.position"
        >
          <amap-marker
            v-if="map.location.length > 0"
            :position="map.location"
          />
        </amap>
      </a-modal>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getClockList, exportExcel } from '@/api/clock'
import { getBoatList } from '@/api/device'
import Amap from '@amap/amap-vue/lib/amap'
import AmapMarker from '@amap/amap-vue/lib/marker'

export default {
  name: 'List',
  components: {
    Amap,
    AmapMarker
  },
  data () {
    return {
      visible: false,
      tableData: {
        column: [
          {
            title: '编号',
            dataIndex: 'pin'
          },
          {
            title: '姓名',
            dataIndex: 'name'
          },
          {
            title: '乘船图片',
            dataIndex: 'img',
            scopedSlots: { customRender: 'img' }
          },
          {
            title: '船只',
            dataIndex: 'sn_name'
          },
          {
            title: '上船/下船',
            dataIndex: 'sn_remark'
          },
          {
            title: '打卡位置',
            dataIndex: 'in_or_out',
            scopedSlots: { customRender: 'inOrOut' }
          },
          {
            title: '位置',
            dataIndex: 'location',
            scopedSlots: { customRender: 'location' }
          },
          {
            title: '时间',
            dataIndex: 'clock_in_at'
          }
        ],
        list: [],
        pagination: {
          current: 1,
          pageSize: 20,
          total: 0
        },
        loading: false
      },
      map: {
        zoom: 17,
        position: [104.066143, 30.573095],
        location: []
      },
      filter: {
        columns: [
          {
            prop: 'name',
            label: '姓名',
            type: 'input'
          },
          {
            prop: 'device',
            label: '船只',
            type: 'select',
            option: []
          },
          {
            prop: 'inOrOut',
            label: '位置',
            type: 'select',
            option: [
              {
                value: '上岛',
                label: '岛方向'
              },
              {
                value: '离岛',
                label: '岸方向'
              }
            ]
          },
          {
            prop: 'remark',
            label: '上船/下船',
            type: 'select',
            option: [
              {
                value: '上船',
                label: '上船'
              },
              {
                value: '下船',
                label: '下船'
              }
            ]
          },
          {
            prop: 'date',
            label: '日期',
            type: 'rangePicker'
          }
        ],
        data: {}
      },
      domain: process.env.VUE_APP_URL
    }
  },
  mounted () {
    this.getList()
    this.boatList()
  },
  methods: {
    boatList () {
      this.filter.columns[1].option = []
      getBoatList().then(res => {
        res.data.forEach((item, index) => {
          this.filter.columns[1].option.push({
            value: item,
            label: item
          })
        })
      })
    },
    getList () {
      this.tableData.loading = true
      const params = {
        page: this.tableData.pagination.current,
        limit: this.tableData.pagination.pageSize,
        name: this.filter.data.name,
        device: this.filter.data.device,
        remark: this.filter.data.remark,
        inOrOut: this.filter.data.inOrOut,
        date: this.filter.data.date
      }
      getClockList(params).then(res => {
        this.tableData.loading = false
        this.tableData.list = res.data.list
        const pagination = res.data.pagination
        this.tableData.pagination = {
          current: pagination.page,
          pageSize: pagination.limit,
          total: pagination.total
        }
      }).catch(() => {
        this.tableData.loading = false
      })
    },
    onMap (record) {
      this.visible = true
      this.map.location = [record.lng, record.lat]
      this.map.position = [record.lng, record.lat]
    },
    onChange (e) {
      this.tableData.pagination = e
      this.getList()
    },
    onSearch () {
      this.tableData.pagination.current = 1
      this.getList()
    },
    onResetSearch () {
      this.filter.data = {}
      this.getList()
    },
    onExport () {
      const params = {
        name: this.filter.data.name,
        device: this.filter.data.device,
        remark: this.filter.data.remark,
        inOrOut: this.filter.data.inOrOut,
        date: this.filter.data.date
      }
      exportExcel(params).then(res => {
        const blob = new Blob([res], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        const objectUrl = URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = objectUrl
        // a.click();
        // 下面这个写法兼容火狐
        a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
        window.URL.revokeObjectURL(blob)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.action > * {
  margin-right: 10px;
}

.action > *:last-child {
  margin-right: 0;
}
</style>
