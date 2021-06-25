import request from '@/utils/request'

const userApi = {
  Login: '/admin/login',
  Logout: '/admin/logout',
  info: '/admin/info'
}

export function login (parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}

export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post'
  })
}

export function getInfo () {
  return request({
    url: userApi.info,
    method: 'get'
  })
}
