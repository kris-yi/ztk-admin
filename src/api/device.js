import request from '@/utils/request'

const api = {
  add: '/admin/device/add',
  list: '/admin/device/list',
  boatList: '/admin/device/boat_list',
  delete: '/admin/device/delete'
}

export function addDevice (params) {
  return request({
    url: api.add,
    method: 'post',
    data: params
  })
}

export function getDeviceList () {
  return request({
    url: api.list,
    method: 'get'
  })
}

export function deleteDevice (params) {
  return request({
    url: api.delete,
    method: 'post',
    data: params
  })
}

export function getBoatList (params) {
  return request({
    url: api.boatList,
    method: 'get',
    params: params
  })
}
