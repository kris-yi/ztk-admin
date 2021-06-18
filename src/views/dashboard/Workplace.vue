<template>
  <page-header-wrapper>
    <template v-slot:content>
      <div class="page-header-content">
        <div class="avatar">
          <a-avatar size="large" :src="currentUser.avatar"/>
        </div>
        <div class="content">
          <div class="content-title">
            {{ timeFix }}，{{ name }}<span class="welcome-text">，{{ welcome }}</span>
          </div>
        </div>
      </div>
    </template>
    <div>
      <a-row :gutter="24">
        <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            style="margin-bottom: 24px;padding-bottom: 10px;"
            :bordered="false"
            title="数据看板"
            :body-style="{ padding: 0 }">
            <div style="margin: 10px 24px;" class="data-board">
              <a-spin :spinning="chartLoading">
                <a-col
                  :xl="6"
                  :lg="6"
                  :md="6"
                  :sm="12"
                  :xs="24"
                  v-for="(item,index) in statistics.list"
                  :key="index"
                >
                  <a-statistic
                    :title="item.label"
                    :value="statistics.data[item.prop]"
                  />
                </a-col>
              </a-spin>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-header-wrapper>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapActions, mapState } from 'vuex'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { ChartCard, Bar } from '@/components'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import { statistic } from '@/api/home'

export default {
  name: 'Workplace',
  components: {
    PageHeaderWrapper,
    ChartCard,
    Bar
  },
  data () {
    return {
      locale,
      timeFix: timeFix(),
      spinning: false,
      chartLoading: false,
      statistics: {
        list: [
          {
            label: '常住居民数',
            prop: 'users'
          },
          {
            label: '常住居民今日乘船人数',
            prop: 'clockToday'
          },
          {
            label: '常住居民离岛情况数',
            prop: 'leaveUsers'
          },
          {
            label: '常住居民在岛情况数',
            prop: 'inUsers'
          },
          {
            label: '常住居民未知情况数',
            prop: 'unknownUsers'
          },
          {
            label: '今日访客数',
            prop: 'visitors'
          }
        ],
        data: {}
      }
    }
  },
  computed: {
    ...mapState({
      name: (state) => state.user.name,
      welcome: (state) => state.user.welcome,
      avatar: (state) => state.user.avatar
    }),
    currentUser () {
      return {
        name: this.name,
        avatar: this.avatar ? this.avatar : 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
      }
    },
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  mounted () {
    this.GetInfo()
    this.getStatistic()
  },
  methods: {
    ...mapActions(['GetInfo']),
    getStatistic () {
      statistic().then(response => {
        this.statistics.data = response.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "./Workplace.less";

.data-board > * {
  margin-top: 24px;
}

.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
      color: #000000a6;
    }
    a:hover {
      color: #1890ff;
    }
    a.active {
      color: #1890ff;
    }
  }
}

</style>
