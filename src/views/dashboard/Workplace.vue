<template>
  <page-header-wrapper>
    <div>
      <a-row :gutter="24">
        <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            style="margin-bottom: 24px;padding-bottom: 10px;"
            :bordered="false"
            title="大小中坝常住居民情况"
            :body-style="{ padding: 0 }">
            <div style="margin: 10px 24px;" class="data-board">
              <a-col
                :xl="6"
                :lg="6"
                :md="6"
                :sm="12"
                :xs="24"
                v-for="(item,index) in statistics.over.label"
                :key="index"
              >
                <a-statistic
                  :title="item.label"
                  :value="statistics.over.data[item.prop]"
                />
              </a-col>
            </div>
          </a-card>
        </a-col>
        <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            style="margin-bottom: 24px;padding-bottom: 10px;"
            :bordered="false"
            title="大小中坝访客在岛情况"
            :body-style="{ padding: 0 }">
            <div style="margin: 10px 24px;" class="data-board">
              <a-col
                :xl="6"
                :lg="6"
                :md="6"
                :sm="12"
                :xs="24"
                v-for="(item,index) in statistics.visitor.label"
                :key="index"
              >
                <a-statistic
                  :title="item.label"
                  :value="statistics.visitor.data[item.prop]"
                />
              </a-col>
            </div>
          </a-card>
        </a-col>
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
        bar: [],
        over: {
          label: [
            {
              label: '小中坝总人数',
              prop: 'smallUsers'
            },
            {
              label: '小中坝在岛人数',
              prop: 'smallInUsers'
            },
            {
              label: '小中坝离岛人数',
              prop: 'smallLeaveUsers'
            },
            {
              label: '小中坝未知情况人数',
              prop: 'smallUnknownUsers'
            },
            {
              label: '大中坝总人数',
              prop: 'bigUsers'
            },
            {
              label: '大中坝在岛人数',
              prop: 'bigInUsers'
            },
            {
              label: '大中坝离岛人数',
              prop: 'bigLeaveUsers'
            },
            {
              label: '大中坝未知情况人数',
              prop: 'bigUnknownUsers'
            }
          ],
          data: {}
        },
        visitor: {
          label: [
            {
              label: '小中坝访客在岛人数',
              prop: 'smallVisitorUsers'
            },
            {
              label: '大中坝访客在岛人数',
              prop: 'bigVisitorUsers'
            }
          ],
          data: {}
        }
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
        this.statistics.over.data = {
          smallUsers: response.data.smallUsers,
          smallLeaveUsers: response.data.smallLeaveUsers,
          smallInUsers: response.data.smallInUsers,
          smallUnknownUsers: response.data.smallUnknownUsers,
          bigUsers: response.data.bigUsers,
          bigLeaveUsers: response.data.bigLeaveUsers,
          bigInUsers: response.data.bigInUsers,
          bigUnknownUsers: response.data.bigUnknownUsers
        }
        this.statistics.visitor.data = {
          smallVisitorUsers: response.data.smallVisitorUsers,
          bigVisitorUsers: response.data.bigVisitorUsers
        }
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
