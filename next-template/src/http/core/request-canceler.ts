/**
 * 请求取消核心逻辑：
 * 1.定义一个Map。存储请求的配置与取消控制器对象的映射关系
 * 2.发送请求前，在请求拦截器中创建取消控制器对象
 * 3.在响应拦截器中（无论成功失败）都需要根据请求配置config从Map中移除
 * 4.如果需要取消某个请求，从Map中根据请求配置获取取消控制器，调用该控制器的abort（）方法。
 * 5.如果需要取消所有请求，则遍历Map中的所有控制器，依次掉用abort（）方法
 */
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import type { HttpPlugin } from './plugin.ts'
/**
 * 请求取消器插件
 * 负责管理自动取消重复请求 和 手动取消请求
 * @implements HttpPlugin是 TypeScript 中的**“实现接口”**语法
 *
 */
export class RequestCanceler implements HttpPlugin {
  // 存储取消器的映射表
  private readonly cancelMap: Map<string, AbortController>
  constructor() {
    this.cancelMap = new Map()
  }
  /**
   * 作用：生成请求的唯一标识
   * 规则：方法（GET）+URL（/api/demo）+参数（params）+数据（data）
   * 目的：如果你在极短时间内再次发起一个完全一样的请求（比如用户疯狂点击保存按钮），被识别为重复请求
   */
  private generateKey(config: AxiosRequestConfig): string {
    const { url, method, params, data } = config
    return `${method || 'GET'}-${url}-${JSON.stringify(params || {})}-${JSON.stringify(data || {})}`
  }
  /**
   * 取消请求并从映射表中移除
   */
  public remove(config: AxiosRequestConfig): void {
    const key = this.generateKey(config)
    if (this.cancelMap.has(key)) {
      const controller = this.cancelMap.get(key)
      controller?.abort()
      this.cancelMap.delete(key)
    }
  }
  /**
   * 添加请求到取消器映射表
   * @param config 请求配置
   * 核心逻辑：每次新请求进来前，有相同的，调用旧请求的abort方法取消它，保留新的
   */
  public add(config: AxiosRequestConfig): void {
    // 先取消之前相同的请求
    this.remove(config)
    const key = this.generateKey(config)
    const controller = new AbortController()
    config.signal = controller.signal
    this.cancelMap.set(key, controller)
  }
  /**
   * 取消所有请求
   */
  public clear(): void {
    this.cancelMap.forEach((controller) => {
      controller.abort()
    })
    this.cancelMap.clear()
  }
  /**
   *插件化挂载apply
   * 应用插件到 Axios 实例
   * @param instance Axios 实例
   */
  public apply(instance: AxiosInstance): void {
    // 请求拦截器：添加请求到取消器
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        this.add(config)
        return config as any
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      },
    ) // 响应拦截器：从取消器中移除请求
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        this.remove(response.config)
        return response
      },
      (error: AxiosError) => {
        if (error.config) {
          this.remove(error.config)
        }
        return Promise.reject(error)
      },
    )
  }
}
