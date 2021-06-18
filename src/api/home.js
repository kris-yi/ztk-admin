import request from '@/utils/request'

const api = {
  statistic: '/admin/statistic'
}

export function statistic () {
  return request({
    url: api.statistic,
    method: 'get'
  })
}
