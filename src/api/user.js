import request from '@/utils/request'

const api = {
  list: '/admin/user/list',
  add: '/admin/user/add',
  info: '/admin/user/info',
  edit: '/admin/user/edit',
  delete: '/admin/user/delete',
  clockList: '/admin/user/clock_list',
  updatePassword: '/admin/update_password',
  exportExcel: '/admin/user/export',
  updateUserStatus: '/admin/user/update_status'
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

export function updatePassword (params) {
  return request({
    url: api.updatePassword,
    method: 'post',
    data: params
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

export function updateUserStatus (params) {
  return request({
    url: api.updateUserStatus,
    method: 'post',
    data: params
  })
}
