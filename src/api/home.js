import request from '@/utils/request'

const api = {
  statistic: '/admin/statistic',
  todayClock: '/admin/statistic/today_clock',
  sevenDayClock: '/admin/statistic/seven_day_clock'
}

export function statistic () {
  return request({
    url: api.statistic,
    method: 'get'
  })
}

export function todayClock () {
  return request({
    url: api.todayClock,
    method: 'get'
  })
}

export function sevenDayClock () {
  return request({
    url: api.sevenDayClock,
    method: 'get'
  })
}
