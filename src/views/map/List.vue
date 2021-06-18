<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="()=>{this.$router.push({ name: 'AddMap' })}">新增</a-button>
      </div>
      <a-table
        :dataSource="tableData.list"
        :loading="tableData.loading"
        :columns="tableData.column"
        :pagination="tableData.pagination"
        :rowKey="(record,index)=>{return index}"
      >
        <template slot="action" slot-scope="text, record">
          <a-icon
            type="edit"
            :style="{ color: '#1890ff' }"
            @click="onEdit(record)"
          />
          <a-popconfirm
            title="确定要删除吗？"
            ok-text="是"
            cancel-text="否"
            :visible="record._id===visibleId && deleteVisible"
            @confirm="handleDelete(record)"
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
import { deleteInfo, getList } from '@/api/map'

export default {
  name: 'Map',
  data () {
    return {
      tableData: {
        column: [
          {
            title: '名称',
            dataIndex: 'name'
          },
          {
            title: '上/离岛',
            dataIndex: 'inOrOut'
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
        }
      },
      deleteVisible: false,
      visibleId: '',
      okButtonProps: {
        props: {
          loading: false
        }
      }
    }
  },
  created () {
    this.list()
  },
  methods: {
    list () {
      getList().then(res => {
        this.tableData.list = res.data.list
        this.tableData.pagination = {
          current: res.data.pagination.page,
          pageSize: res.data.pagination.limit,
          total: res.data.pagination.total
        }
      })
    },
    onEdit (record) {
      this.$router.push({
        name: 'AddMap',
        query: {
          id: record._id
        }
      })
    },
    handleDelete () {
      this.okButtonProps.props.loading = true
      deleteInfo({ id: this.visibleId }).then(res => {
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
        this.list()
      })
    },
    onDelete (record) {
      this.visibleId = record._id
      this.deleteVisible = true
    },
    onDeleteCancel () {
      this.deleteVisible = false
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
