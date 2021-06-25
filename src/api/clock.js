import request from '@/utils/request'

const api = {
  list: '/admin/clock/list',
  exportExcel: '/admin/clock/export'
}

export function getClockList (params) {
  return request({
    url: api.list,
    method: 'get',
    params: params
  })
}

export function exportExcel (params) {
  return request({
    url: api.exportExcel,
    method: 'get',
    params: params,
    responseType: 'blob'
  })
}
