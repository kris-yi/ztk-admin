import request from '@/utils/request'

const userApi = {
  add: '/admin/add',
  del: '/admin/delete',
  edit: '/admin/edit',
  detail: '/admin/detail',
  list: '/admin/list'
}

export function addAdmin (parameter) {
  return request({
    url: userApi.add,
    method: 'post',
    data: parameter
  })
}

export function getAdminList (parameter) {
  return request({
    url: userApi.list,
    method: 'get',
    params: parameter
  })
}

export function delAdmin (parameter) {
  return request({
    url: userApi.del,
    method: 'post',
    data: parameter
  })
}

export function editAdmin (parameter) {
  return request({
    url: userApi.edit,
    method: 'post',
    data: parameter
  })
}

export function getDetail (parameter) {
  return request({
    url: userApi.detail,
    method: 'get',
    params: parameter
  })
}
