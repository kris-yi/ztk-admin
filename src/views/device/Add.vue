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
import { addDevice } from '@/api/device'

export default {
  name: 'Add',
  data () {
    return {
      loading: false,
      submit: false,
      satellite: false,
      form: [
        {
          label: '设备编号',
          prop: 'sn',
          type: 'input',
          wrapperCol: 12,
          validate: true
        },
        {
          label: '设备类型',
          prop: 'type',
          type: 'radio',
          wrapperCol: 12,
          option: [
            {
              key: '打卡机',
              value: '人脸识别终端'
            },
            {
              key: 'gps',
              value: '移动通信定位终端'
            }
          ],
          validate: true
        },
        {
          label: '船只名称',
          prop: 'device_name',
          type: 'input',
          wrapperCol: 12,
          validate: true
        },
        {
          label: '备注',
          prop: 'remark',
          type: 'radio',
          wrapperCol: 12,
          option: [
            {
              key: '上船',
              value: '上船'
            },
            {
              key: '下船',
              value: '下船'
            },
            {
              key: '定位',
              value: '定位'
            }
          ],
          validate: true
        }
      ],
      insertForm: {},
      insertFormRules: {
        sn: [
          { required: true, message: '请输入设备编号', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择设备类型', trigger: 'blur' }
        ],
        device_name: [
          { required: true, message: '请输入船只名称', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请选择备注', trigger: 'blur' }
        ]
      },
      edit: false
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
      }
    },
    handleSubmit (e) {
      e.preventDefault()
      this.$refs.insert.validate(valid => {
        if (valid) {
          this.submit = true
          if (!this.edit) {
            addDevice(this.insertForm).then(res => {
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
              setTimeout(() => {
                this.$router.push({
                  name: 'DeviceList'
                })
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
