import axios from 'axios'
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
, function () {
})
export default axios
