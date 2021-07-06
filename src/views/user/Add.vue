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
            <a-radio-group
              v-if="item.type==='radio'"
              v-model="insertForm[item.prop]"
            >
              <a-radio-button
                v-for="(value,valIndex) in item.option"
                :value="value.key"
                :key="valIndex"
              >
                {{ value.value }}
              </a-radio-button>
            </a-radio-group>
            <a-upload
              v-if="item.type==='upload'"
              name="file"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              :customRequest="customRequest"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" width="200"/>
              <div v-else>
                <a-icon :type="imgLoading ? 'loading' : 'plus'"/>
                <div class="ant-upload-text">
                  Upload
                </div>
              </div>
            </a-upload>
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
import { addUser, userInfo, editUser } from '@/api/user'
import { upload } from '@/api/upload'

export default {
  name: 'Add',
  data () {
    return {
      loading: false,
      submit: false,
      satellite: false,
      form: [
        {
          label: '姓名',
          prop: 'name',
          type: 'input',
          wrapperCol: 12,
          validate: true
        },
        {
          label: '图片',
          prop: 'img',
          type: 'upload',
          wrapperCol: 12
        },
        {
          label: '身份证号',
          prop: 'cardId',
          type: 'input',
          wrapperCol: 12
        },
        {
          label: '性别',
          prop: 'sex',
          type: 'radio',
          wrapperCol: 12,
          option: [
            {
              key: '男',
              value: '男'
            },
            {
              key: '女',
              value: '女'
            }
          ],
          validate: true
        },
        {
          label: '联系电话',
          prop: 'phone',
          type: 'input',
          wrapperCol: 12,
          validate: true
        },
        {
          label: '备用联系电话',
          prop: 'mobile',
          type: 'input',
          wrapperCol: 12
        },
        {
          label: '所属岛',
          prop: 'belong',
          type: 'radio',
          wrapperCol: 12,
          option: [
            {
              key: 1,
              value: '小中坝'
            },
            {
              key: 2,
              value: '大中坝'
            }
          ],
          validate: true
        },
        {
          label: '住址',
          prop: 'address',
          type: 'input',
          wrapperCol: 12
        }
      ],
      insertForm: {},
      insertFormRules: {
        name: [
          { required: true, message: '请输入居民姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        belong: [
          { required: true, message: '请选择所属岛', trigger: 'blur' }
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
        userInfo({ id: query.id }).then(res => {
          this.insertForm = {
            id: query.id,
            name: res.data.name,
            cardId: res.data.id_card,
            sex: res.data.sex,
            phone: res.data.phone,
            mobile: res.data.mobile,
            address: res.data.address,
            pin: res.data.pin,
            img: res.data.img,
            belong: res.data.belong
          }
          this.imageUrl = process.env.VUE_APP_URL + res.data.img
          this.edit = true
          this.loading = false
        })
      }
    },
    handleSubmit (e) {
      e.preventDefault()
      this.$refs.insert.validate(valid => {
        if (valid) {
          this.submit = true
          if (!this.edit) {
            addUser(this.insertForm).then(res => {
              if (res.status) {
                this.$notification.error({
                  message: res.msg
                })
                return
              }
              this.submit = false
              this.$notification.success({
                message: '新增成功'
              })
              setTimeout(() => {
                this.$router.push('/user/list')
              }, 1000)
            })
          } else {
            editUser(this.insertForm).then(res => {
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
                this.$router.go(-1)
              }, 1000)
            })
          }
        }
      })
    },
    customRequest (options) {
      this.imageUrl = ''
      this.imgLoading = true
      const params = new FormData()
      params.append('file', options.file)
      upload(params).then(res => {
        this.insertForm.img = res.data.path
        this.imageUrl = process.env.VUE_APP_URL + res.data.path
        this.imgLoading = false
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
