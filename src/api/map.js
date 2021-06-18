import request from '@/utils/request'

const api = {
  add: '/admin/map/add',
  list: '/admin/map/list',
  info: '/admin/map/info',
  edit: '/admin/map/edit',
  delete: '/admin/map/delete'
}

export function addPolygon (params) {
  return request({
    url: api.add,
    method: 'post',
    data: params
  })
}

export function getList () {
  return request({
    url: api.list,
    method: 'get'
  })
}

export function getInfo (params) {
  return request({
    url: api.info,
    method: 'get',
    params: params
  })
}

export function editInfo (params) {
  return request({
    url: api.edit,
    method: 'post',
    data: params
  })
}

export function deleteInfo (params) {
  return request({
    url: api.delete,
    method: 'post',
    data: params
  })
}
