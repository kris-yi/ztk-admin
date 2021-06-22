import request from '@/utils/request'

const api = {
  upload: '/admin/upload'
}

export function upload (params) {
  return request({
    url: api.upload,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
