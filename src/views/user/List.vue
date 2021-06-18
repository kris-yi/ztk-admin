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
              </a-form-item>
            </a-col>
            <a-col :md="24">
              <span
                class="table-page-search-submitButtons"
                :style="{float:'right',overflow:'hidden'}"
              >
                <a-button type="primary" @click="onSearch">查询</a-button>
                <a-button style="margin-left: 8px" @click="onResetSearch">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="()=>{this.$router.push({name:'userAdd'})}">新增</a-button>
      </div>
      <a-table
        :dataSource="tableData.list"
        :loading="tableData.loading"
        :columns="tableData.column"
        :pagination="tableData.pagination"
        :rowKey="(record,index)=>{return index}"
      >
        <template slot="img" slot-scope="text, record">
          <img
            v-if="record.img"
            :src="record.img"
            width="100px"
          />
          <div v-else>未采集人脸</div>
        </template>
        <template slot="action" slot-scope="text, record">
          <a-icon
            type="carry-out"
            :style="{ color: '#1890ff' }"
            @click="onClockList(record)"
          />
          <a-icon
            type="edit"
            :style="{ color: '#1890ff' }"
            @click="onEdit(record)"
          />
          <a-popconfirm
            title="确定要删除吗？"
            ok-text="是"
            cancel-text="否"
            :visible="parseInt(record.id)===parseInt(visibleId) && deleteVisible"
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
import { getUserList, deleteUser } from '@/api/user'

export default {
  name: 'List',
  data () {
    return {
      filter: {
        columns: [
          {
            prop: 'pin',
            label: '编号',
            type: 'input'
          },
          {
            prop: 'name',
            label: '姓名',
            type: 'input'
          },
          {
            prop: 'cardId',
            label: '身份证号',
            type: 'input'
          },
          {
            prop: 'phone',
            label: '电话',
            type: 'input'
          },
          {
            prop: 'status',
            label: '上岛/离岛',
            type: 'select',
            option: [
              {
                value: '1',
                label: '上岛'
              },
              {
                value: '0',
                label: '离岛'
              },
              {
                value: '-1',
                label: '未知'
              }
            ]
          }
        ],
        data: {}
      },
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
            title: '图片',
            dataIndex: 'img',
            scopedSlots: { customRender: 'img' }
          },
          {
            title: '性别',
            dataIndex: 'sex'
          },
          {
            title: '联系电话',
            dataIndex: 'phone'
          },
          {
            title: '备用联系电话',
            dataIndex: 'mobile'
          },
          {
            title: '住址',
            dataIndex: 'address'
          },
          {
            title: '上岛/离岛',
            dataIndex: 'status'
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
      deleteVisible: false,
      visibleId: '',
      okButtonProps: {
        props: {
          loading: false
        }
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.tableData.loading = true
      getUserList(this.filter.data).then(res => {
        console.log(res.data)
        this.tableData.list = res.data.list
        const pagination = res.data.pagination
        this.tableData.pagination = {
          current: pagination.page,
          pageSize: pagination.limit,
          total: pagination.total
        }
        this.tableData.loading = false
      })
    },
    onEdit (record) {
      this.$router.push({
        path: '/user/add',
        query: {
          id: record.id
        }
      })
    },
    onDelete (record) {
      this.visibleId = record.id
      this.deleteVisible = true
    },
    onDeleteCancel () {
      this.deleteVisible = false
    },
    handleDelete (record) {
      this.okButtonProps.props.loading = true
      const params = {
        id: this.visibleId,
        pin: record.pin
      }
      deleteUser(params).then(res => {
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
      })
    },
    onClockList (record) {
      this.$router.push({
        name: 'ClockList',
        query: {
          pin: record.pin
        }
      })
    },
    onSearch () {
      this.getList()
    },
    onResetSearch () {
      this.filter.data = {}
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
