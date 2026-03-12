/**
 * @提供自定义配置 （自定义请求拦截器，请求头添加token，自定义响应拦截器，使用ui展示错误信息，自定义请求基础路径，超时时间等）
 * @创建并导出HttpClient 实例对象,以便service层使用
 */
import { HttpClient } from '@/http/core/http-client.ts'
import type { AxiosRequestConfig } from 'axios'
//自定义请求拦截处理函数
const customRequestOnFulfilled = (config: AxiosRequestConfig) => {
  const { headers = {} } = config
  headers.token = 'aaaaaa'
  return config
}
//创建并导出HttpClient对象api
export const api = new HttpClient({
  // enableCancel: true,
  interceptor: {
    request: {
      onFulfilled: customRequestOnFulfilled,
    },
  },
})
// 导出axios实例
export const instance=api.getInstance()