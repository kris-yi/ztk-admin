import request from '@/utils/request'

const userApi = {
  Login: '/admin/login',
  info: '/admin/info'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return request({
    url: userApi.info,
    method: 'get'
  })
}
