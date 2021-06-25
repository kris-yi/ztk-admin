<template>
  <page-header-wrapper>
    <div>
      <a-row :gutter="24">
        <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
          <a-card
            style="margin-bottom: 24px;padding-bottom: 10px;"
            :bordered="false"
            title="今日实时乘船人次"
            :body-style="{ padding: 0 }">
            <div style="margin: 10px 24px;" class="data-board">
              <ant-line :data="statistics.line" id="line1"></ant-line>
            </div>
          </a-card>
        </a-col>
        <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
          <a-card
            style="margin-bottom: 24px;padding-bottom: 10px;"
            :bordered="false"
            title="在岛情况"
            :body-style="{ padding: 0 }">
            <div style="margin: 10px 24px;" class="data-board">
              <pie :data="statistics.pie" id="pie1"></pie>
            </div>
          </a-card>
        </a-col>
        <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
          <a-card
            style="margin-bottom: 24px;padding-bottom: 10px;"
            :bordered="false"
            title="最近7日乘船人次"
            :body-style="{ padding: 0 }">
            <div style="margin: 10px 24px;" class="data-board">
              <ant-bar :data="statistics.bar" id="bar1"></ant-bar>
            </div>
          </a-card>
        </a-col>
        <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
          <a-card
            style="margin-bottom: 24px;padding-bottom: 10px;"
            :bordered="false"
            title="数据统计"
            :body-style="{ padding: 0 }">
            <div style="margin: 10px 24px;" class="data-board">
              <column :data="statistics.column" id="column1"></column>
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
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import { sevenDayClock, statistic, todayClock } from '@/api/home'
import Pie from './Pie'
import Column from './Column'
import antLine from './Line'
import antBar from './Bar'

export default {
  name: 'Workplace',
  components: {
    PageHeaderWrapper,
    Pie,
    Column,
    antLine,
    antBar
  },
  data () {
    return {
      locale,
      timeFix: timeFix(),
      spinning: false,
      chartLoading: false,
      statistics: {
        pie: [],
        column: [],
        line: [],
        bar: []
      },
      setTimeOutId: ''
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
    this.getTodayClock()
    this.getSevenDayClock()
    this.setTimeOutId = setInterval(() => {
      this.getStatistic()
      this.getTodayClock()
      this.getSevenDayClock()
    }, 10000)
  },
  methods: {
    ...mapActions(['GetInfo']),
    getStatistic () {
      statistic().then(response => {
        this.statistics.pie = [
          { type: '离岛', value: response.data.leaveUsers },
          { type: '在岛', value: response.data.inUsers },
          { type: '未知', value: response.data.unknownUsers }
        ]
        this.statistics.column = [
          { type: '常住居民', sales: response.data.users },
          { type: '今日打卡人数', sales: response.data.clockToday },
          { type: '今日访客数', sales: response.data.visitors }
        ]
      })
    },
    getTodayClock () {
      todayClock().then(response => {
        this.statistics.line = response.data.todayClock
      })
    },
    getSevenDayClock () {
      sevenDayClock().then(response => {
        this.statistics.bar = response.data.sevenDayClock
      })
    }
  },
  beforeDestroy () {
    clearTimeout(this.setTimeOutId)
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
