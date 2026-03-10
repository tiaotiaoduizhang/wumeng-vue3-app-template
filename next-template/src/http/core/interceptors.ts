/**
 * 拦截器封装
 * 请求拦截器  （成功&失败）
 * 响应拦截器  （成功&失败）
 */

import { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios'
import { Env } from '@/utils/env'
import type { InterceptorConfig } from './type'

// 默认请求拦截器-成功处理函数
export const defaultRequestOnFulfilled = (config: AxiosRequestConfig) => {
  // 请求日志
  if (Env.isDev) {
    console.log('Request:', {
      url: config.url,
      method: config.method,
      params: config.params,
      data: config.data,
    })
  }
  return config
}
// 默认请求拦截器-失败处理函数
export const defaultRequestOnRejected = (error: AxiosError): any => {
  return Promise.reject(error)
}

// 默认响应拦截器-成功
export const defaultResponseOnFulfilled = (response: AxiosResponse): any => {
  // 响应日志
  if (Env.isDev) {
    console.log('Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    })
  } // 解析 API 响应

  const { data } = response // 检查是否为标准 API 响应格式

  if (data && typeof data === 'object' && 'code' in data && 'message' in data) {
    const { code, message, data: responseData } = data // 业务成功时直接返回 data

    if (code === 0 || code === 200) {
      return responseData
    } else // 业务失败时抛出错误
    {
      throw new Error(message || '请求失败')
    }
  } // 非标准格式直接返回响应数据

  return data
}

// 默认响应拦截器-失败处理函数
export const defaultResponseOnRejected = (error: AxiosError): any => {
  console.log('Response Error:', error)
  // 错误处理
  if (error.response) {
    // 服务器返回错误状态码
    const status = error.response.status
    console.error('request error, status: ', status)
  } else if (error.request) {
    // 请求已发出，但没有收到响应
    console.error('Network Error')
  } else {
    // 请求配置错误
    console.error('Request Config Error:', error.message)
  }
  return Promise.reject(error)
}
/**
 * 拦截器管理类
 * 负责配置和管理请求/响应拦截器
 */
export class Interceptors {
  // 定义了一个 私有成员属性 ，用于存储拦截器的配置信息（readonly确保不会被意外覆盖）
  private readonly config: InterceptorConfig
  /**
   * @param config 拦截器配置
   */
  constructor(config: InterceptorConfig = {}) {
    this.config = config
  }
  /**
   * 应用拦截器到 Axios 实例
   * @applyInterceptors  该类在构造函数中接收拦截器配置
   * @param instance Axios 实例
   */
  public applyInterceptors(instance: AxiosInstance): void {
    // 应用请求拦截器
    instance.interceptors.request.use(
      (this.config.request?.onFulfilled ?? defaultRequestOnFulfilled) as any,
      this.config.request?.onRejected ?? defaultRequestOnRejected,
    ) // 应用响应拦截器

    instance.interceptors.response.use(
      this.config.response?.onFulfilled || defaultResponseOnFulfilled,
      this.config.response?.onRejected || defaultResponseOnRejected,
    )
  }
}
