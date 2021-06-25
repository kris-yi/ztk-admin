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
            :labelCol="{lg: {span: 2}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: item.wrapperCol}, sm: {span: 20}}"
            :prop="item.prop"
          >
            <a-input
              v-if="item.type === 'input'"
              :name="item.prop"
              :placeholder="`请输入${item.label}`"
              v-model="insertForm[item.prop]"
            />
            <a-select
              v-if="item.type === 'select'"
              :placeholder="`请选择${item.label}`"
              v-model="insertForm[item.prop]"
            >
              <a-select-option
                value="上岛"
              >
                岛方向
              </a-select-option>
              <a-select-option
                value="离岛"
              >
                岸方向
              </a-select-option>
            </a-select>
            <amap
              v-if="item.type === 'map'"
              ref="map"
              style="width: 100%; height: 600px;"
              :zoom="map.zoom"
              :center="map.position"
            >
              <a-form class="info ant-card ant-card-bordered" layout="inline">
                <a-form-item>
                  <a-button type="primary" size="small" @click="onClear">
                    清除电子围栏
                  </a-button>
                </a-form-item>
                <a-form-item label="卫星图">
                  <a-switch v-model="satellite"/>
                </a-form-item>
              </a-form>
              <amap-mouse-tool
                :mode.sync="drawer.mode"
                @draw="onDraw"
              />
              <amap-polygon
                v-if="drawer.polygon"
                :path.sync="drawer.polygon"
                :fill-color="drawer.fill"
                :fill-opacity="0.5"
                :stroke-color="drawer.stroke"
                :editable="drawer.edit"
              />
              <amap-satellite-layer :visible="satellite"/>
            </amap>
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
import Amap from '@amap/amap-vue/lib/amap'
import AmapPolygon from '@amap/amap-vue/lib/polygon'
import AmapMouseTool from '@amap/amap-vue/lib/mouse-tool'
import AmapSatelliteLayer from '@amap/amap-vue/lib/satellite-layer'
import { addPolygon, editInfo, getInfo } from '@/api/map'

export default {
  name: 'Add',
  components: {
    Amap,
    AmapPolygon,
    AmapMouseTool,
    AmapSatelliteLayer
  },
  data () {
    return {
      loading: false,
      submit: false,
      satellite: false,
      form: [
        {
          label: '名称',
          prop: 'name',
          type: 'input',
          wrapperCol: 20,
          validate: true
        },
        {
          label: '位置',
          prop: 'inOrOut',
          type: 'select',
          wrapperCol: 20,
          validate: true
        },
        {
          label: '围栏',
          prop: 'map',
          type: 'map',
          wrapperCol: 20
        }
      ],
      insertForm: {},
      insertFormRules: {
        name: [
          { required: true, message: '请输入电子围栏名称', trigger: 'blur' }
        ],
        inOrOut: [
          { required: true, message: '请选择上/离岛', trigger: 'blur' }
        ]
      },
      map: {
        zoom: 14,
        position: [104.066143, 30.573095]
      },
      drawer: {
        mode: 'polygon',
        polygon: null,
        fill: '#409EFF',
        stroke: '#000A58',
        edit: true
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
        getInfo({ id: query.id }).then(res => {
          this.insertForm = {
            id: query.id,
            name: res.data.name,
            inOrOut: res.data.inOrOut
          }
          this.drawer.mode = 'none'
          const coordinates = res.data.point.coordinates[0]
          coordinates.pop()
          this.drawer.polygon = coordinates
          this.map.position = coordinates[0]
          this.edit = true
        })
      }
    },
    onDraw (type, res) {
      this.drawer.polygon = res
    },
    onClear () {
      this.drawer.polygon = null
      this.drawer.mode = 'polygon'
    },
    handleSubmit (e) {
      e.preventDefault()
      this.$refs.insert.validate(valid => {
        if (valid) {
          this.submit = true
          this.insertForm.point = this.drawer.polygon
          if (!this.edit) {
            addPolygon(this.insertForm).then(res => {
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
                this.$router.push({ name: 'MapList' })
              }, 1000)
            }).catch(() => {
              this.submit = false
            })
          } else {
            editInfo(this.insertForm).then(res => {
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
                this.$router.push({ name: 'MapList' })
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
