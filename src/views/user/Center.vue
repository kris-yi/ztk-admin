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
            <a-input-password
              v-if="item.type === 'input-password'"
              :name="item.prop"
              :placeholder="`请输入${item.label}`"
              v-model="insertForm[item.prop]"
            />
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
import { updatePassword } from '@/api/user'

export default {
  name: 'Add',
  data () {
    return {
      loading: false,
      submit: false,
      satellite: false,
      form: [
        {
          label: '原密码',
          prop: 'oldPwd',
          type: 'input-password',
          wrapperCol: 12,
          validate: true
        },
        {
          label: '新密码',
          prop: 'newPwd',
          type: 'input-password',
          wrapperCol: 12,
          validate: true
        }
      ],
      insertForm: {},
      insertFormRules: {
        oldPwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ]
      },
      edit: false
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.$refs.insert.validate(valid => {
        if (valid) {
          this.submit = true
          updatePassword(this.insertForm).then(res => {
            this.submit = false
            if (res.status) {
              this.$notification.error({
                message: res.msg
              })
              return
            }
            this.$notification.success({
              message: '修改成功，请重新登录'
            })
            setTimeout(() => {
              this.$store.dispatch('Logout').then(() => {
                this.$router.push({ name: 'login' })
              })
            }, 1000)
          })
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
