import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 请求拦截 统一处理请求token
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
})
// 统一处理响应数据
axios.interceptors.response.use(function (response) { // 请求成功执行此函数
  return response.data ? response.data : {}
}
, function (error) { // 统一处理异常数据
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = 'refresh_token未携带或已过期'
      break
    case 401:
      window.localStorage.removeItem('user-token')
      router.push('/login')
      break
    case 507:
      message = '服务器数据库异常'
      break
    default:
      break
  }
  Message.warning(message)
})
export default axios
