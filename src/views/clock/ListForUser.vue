<template>
  <page-header-wrapper>
    <a-card :bordered="false">
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
            type="link"
            @click="onMap(record)"
          >
            点击查看
          </a-button>
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
import { getClockList } from '@/api/user'
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
            title: '图片',
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
          pageSize: 10,
          total: 0
        },
        loading: false
      },
      map: {
        zoom: 17,
        position: [104.066143, 30.573095],
        location: []
      },
      domain: process.env.VUE_APP_URL
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.tableData.loading = true
      const query = this.$route.query
      if (Object.keys(query).length > 0) {
        const params = {
          pin: query.pin,
          page: this.tableData.pagination.current,
          limit: this.tableData.pagination.pageSize
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
        })
      }
    },
    onMap (record) {
      this.visible = true
      this.map.location = [record.lng, record.lat]
      this.map.position = [record.lng, record.lat]
    },
    onChange (e) {
      this.tableData.pagination = e
      this.getList()
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
