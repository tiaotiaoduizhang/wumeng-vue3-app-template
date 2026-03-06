/**
 * 拦截器封装
 * 请求拦截器  （成功&失败）
 * 响应拦截器  （成功&失败）
 */

import { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios'
import { Env } from '@/utils/env'
import type { InterceptorConfig } from './types.ts'

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
