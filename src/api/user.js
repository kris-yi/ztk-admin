import request from '@/utils/request'

const api = {
  list: '/admin/user/list',
  add: '/admin/user/add',
  info: '/admin/user/info',
  edit: '/admin/user/edit',
  delete: '/admin/user/delete',
  clockList: '/admin/user/clock_list'
}

export function getUserList (parameter) {
  return request({
    url: api.list,
    method: 'get',
    params: parameter
  })
}

export function addUser (params) {
  return request({
    url: api.add,
    method: 'post',
    data: params
  })
}

export function userInfo (params) {
  return request({
    url: api.info,
    method: 'get',
    params: params
  })
}

export function editUser (params) {
  return request({
    url: api.edit,
    method: 'post',
    data: params
  })
}

export function deleteUser (params) {
  return request({
    url: api.delete,
    method: 'post',
    data: params
  })
}

export function getClockList (params) {
  return request({
    url: api.clockList,
    method: 'get',
    params: params
  })
}
