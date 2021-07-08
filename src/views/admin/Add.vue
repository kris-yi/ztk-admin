<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-spin :spinning="loading">
        <a-form-model
          ref="insert"
          :model="insertForm"
          :rules="insertFormRules"
          @submit="handleSubmit"
        >
          <a-form-model-item
            v-for="(item,index) in form"
            :label="item.label"
            :key="index"
            :labelCol="{lg: {span: 4}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: item.wrapperCol}, sm: {span: 10}}"
            :prop="item.prop"
          >
            <a-input
              v-if="item.type === 'input'"
              :name="item.prop"
              :placeholder="`请输入${item.label}`"
              v-model="insertForm[item.prop]"
            />
            <a-select
              v-if="item.type==='select'"
              :placeholder="`请选择${item.label}`"
              v-model="insertForm[item.prop]"
            >
              <a-select-option
                v-for="(selectItem,selectIndex) in item.option"
                :key="selectIndex"
                :value="selectItem.value"
              >
                {{ selectItem.label }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item
            :wrapper-col="{ span: 24}"
            style="text-align: center"
          >
            <a-button
              type="primary"
              html-type="submit"
              :loading="submit"
            >
              提交
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-spin>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { addAdmin, editAdmin, getDetail } from '@/api/admin'

export default {
  name: 'Add',
  data () {
    return {
      loading: false,
      submit: false,
      satellite: false,
      form: [
        {
          label: '昵称',
          prop: 'nickname',
          type: 'input',
          wrapperCol: 12,
          validate: true
        },
        {
          label: '账户名',
          prop: 'name',
          type: 'input',
          wrapperCol: 12
        },
        {
          label: '密码',
          prop: 'password',
          type: 'input',
          wrapperCol: 12
        },
        {
          label: '权限组',
          prop: 'role',
          type: 'select',
          wrapperCol: 12,
          option: [
            {
              value: 'manager',
              label: '管理员'
            },
            {
              value: 'view',
              label: '工作人员'
            }
          ]
        }
      ],
      insertForm: {},
      insertFormRules: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入账户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择权限组', trigger: 'blur' }
        ]
      },
      edit: false,
      imgLoading: false,
      imageUrl: ''
    }
  },
  mounted () {
    this.getQueryParameter()
  },
  methods: {
    getQueryParameter () {
      const query = this.$route.query
      if (Object.keys(query).length > 0) {
        this.loading = true
        getDetail({ id: query.id }).then(res => {
          this.insertForm = res.data
          this.edit = true
          this.loading = false
          this.insertFormRules.password[0].required = false
        })
      }
    },
    handleSubmit (e) {
      e.preventDefault()
      this.$refs.insert.validate(valid => {
        if (valid) {
          this.submit = true
          if (!this.edit) {
            addAdmin(this.insertForm).then(res => {
              this.submit = false
              if (res.status) {
                this.$notification.error({
                  message: res.msg
                })
                return
              }
              this.$notification.success({
                message: '新增成功'
              })
              this.$router.push({ name: 'adminList' })
            }).catch(() => {
              this.submit = false
            })
          } else {
            editAdmin(this.insertForm).then(res => {
              if (res.status) {
                this.$notification.error({
                  message: res.msg
                })
                return
              }
              this.submit = false
              this.$notification.success({
                message: '更新成功'
              })
              setTimeout(() => {
                this.$router.push('/admin/list')
              }, 1000)
            }).catch(() => {
              this.submit = false
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.controls {
  position: absolute;
  left: 6px;
  top: 0;
}

.info {
  position: absolute;
  right: 10px;
  top: 10px;
  padding-left: 24px;
}
</style>
