/**
 * 请求防重
 * 1. 请求发送前（请求拦截器）,检查是否有相同的请求正在进行
 * 2.如果有相同的请求正在进行，那就将当前的请求取消
 * 3.如果没有相同请求，就正常发送请求，并将请求标记为‘进行中’
 * 4.在请求完成后（无论成功还是失败。响应拦截器）移除进行中标记
 */
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios'
import type { HttpPlugin } from './plugin.ts'
/**
 * 请求防重插件
 * 负责防止重复请求，复用已有请求的结果
 */
export class RequestDedup implements HttpPlugin {
  //存储正在进行的请求
  private readonly pendingSet: Set<string>
  constructor() {
    this.pendingSet = new Set<string>()
  }
  /**
   * 生成请求的唯一标识
   */
  private generateKey(config: AxiosRequestConfig): string {
    const { url, method, params, data } = config
    return `${method || 'GET'}-${url}-${JSON.stringify(params || {})}-${JSON.stringify(data || {})}`
  }
  /**
   * 应用插件到 Axios 实例
   */
  public apply(instance: AxiosInstance): void {
    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      if (!(config as any).disableDedup) {
        const key = this.generateKey(config)
        if (this.pendingSet.has(key)) {
          console.log(999999)
          // 直接中断请求链的方式，它会直接跳过后续的请求拦截器，进入响应拦截器的错误处理阶段
          throw new axios.Cancel('Duplicate request canceled.')
        } else {
          // 没重复，登记上
          this.pendingSet.add(key)
        }
      }
      return config as any
    })
    // 响应拦截器：清理请求
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const key = this.generateKey(response.config)
        this.pendingSet.delete(key)
        return response
      },
      (error: AxiosError) => {
        // 如果是取消请求
        if (axios.isCancel(error)) {
          // 如果是因为重复请求被取消的，不要清理 pendingSet，因为那是给“正主”留的
          if (error.message === 'Duplicate request canceled.') {
            return Promise.reject(error)
          }
          // 如果是其他原因被取消（如用户手动取消），则需要清理
        }

        // 清理 pendingSet
        if (error.config) {
          const key = this.generateKey(error.config)
          this.pendingSet.delete(key)
        }
        return Promise.reject(error)
      },
    )
  }
}
