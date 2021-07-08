<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="()=>{this.$router.push({name:'DeviceAdd'})}">新增</a-button>
      </div>
      <a-table
        :dataSource="tableData.list"
        :loading="tableData.loading"
        :columns="tableData.column"
        :pagination="tableData.pagination"
        :rowKey="(record,index)=>{return index}"
      >
        <template slot="type" slot-scope="text, record">
          <span v-if="record.type==='打卡机'">人脸识别终端</span>
          <span v-if="record.type==='gps'">移动通信定位终端</span>
        </template>
        <template slot="online" slot-scope="text, record">
          <a-tag :color="record.online===1 && 'green' || 'red'">
            {{ record.online===1 && '在线' || '离线' }}
          </a-tag>
        </template>
        <template slot="action" slot-scope="text, record">
          <a-popconfirm
            title="确定要删除吗？"
            ok-text="是"
            cancel-text="否"
            :visible="record.sn===visibleId && deleteVisible"
            @confirm="handleDelete()"
            @cancel="onDeleteCancel"
            :ok-button-props="okButtonProps"
          >
            <a-icon
              type="delete"
              :style="{ color: '#1890ff' }"
              @click="onDelete(record)"
            />
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { deleteDevice, getDeviceList } from '@/api/device'

export default {
  name: 'List',
  data () {
    return {
      visible: false,
      visibleId: undefined,
      deleteVisible: false,
      okButtonProps: {
        props: {
          loading: false
        }
      },
      tableData: {
        column: [
          {
            title: '设备编号',
            dataIndex: 'sn'
          },
          {
            title: '设备类型',
            dataIndex: 'type',
            scopedSlots: { customRender: 'type' }
          },
          {
            title: '所属船只',
            dataIndex: 'device_name'
          },
          {
            title: '备注',
            dataIndex: 'remark'
          },
          {
            title: '是否在线(10s更新一次)',
            dataIndex: 'online',
            scopedSlots: { customRender: 'online' }
          },
          {
            title: '操作',
            dataIndex: 'action',
            class: 'action',
            align: 'right',
            scopedSlots: { customRender: 'action' }
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
      timerId: {}
    }
  },
  mounted () {
    this.getList()
    this.timer()
  },
  methods: {
    getList () {
      this.tableData.loading = true
      getDeviceList().then(res => {
        this.tableData.loading = false
        this.tableData.list = res.data.list
        const pagination = res.data.pagination
        this.tableData.pagination = {
          current: pagination.page,
          pageSize: pagination.limit,
          total: pagination.total
        }
      })
    },
    onDelete (record) {
      this.visibleId = record.sn
      this.deleteVisible = true
    },
    onDeleteCancel () {
      this.deleteVisible = false
    },
    handleDelete () {
      this.okButtonProps.props.loading = true
      const params = {
        sn: this.visibleId
      }
      deleteDevice(params).then(res => {
        if (res.status) {
          this.$notification.error({
            message: res.msg
          })
          return
        }
        this.submit = false
        this.$notification.success({
          message: '删除成功'
        })
        this.deleteVisible = false
        this.okButtonProps.props.loading = false
        this.getList()
      }).catch(() => {
        this.okButtonProps.props.loading = false
        this.deleteVisible = false
      })
    },
    timer () {
      this.timerId = setInterval(() => {
        this.getList()
      }, 10000)
    }
  },
  beforeDestroy () {
    clearInterval(this.timerId)
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
