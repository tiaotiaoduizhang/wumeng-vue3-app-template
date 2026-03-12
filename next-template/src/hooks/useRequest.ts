/**
 * 实现useRequest hook（统一维护请求状态，代码更加简洁）
 * @import type ts特有语法，仅导入类型信息，编译后会删除，减少包
 */
import type { AxiosRequestConfig } from 'axios'
import type { WatchSource, Ref } from 'vue'
/**
 * 1）配置项的类型定义；
 * @interface 泛型接口定义
 * @T泛型的参数 （表示请求返回的数据类型）
 * ？表示可选属性
 *  @WatchSource <any>[] vue定义的侦听多个来源 WatchSource<T>侦听单个来源
 * ()=> void 函数类型定义  void表示函数没有返回值
 */
export interface UseRequestOptions<T> {
  // 是否在组件挂载时自动请求
  auto?: boolean
  // 依赖项，变化时重新请求
  deps?: WatchSource<any>[]
  //  初始数据
  initialData?: T
  //  请求前的回调
  onBefore?: () => void
  // 请求成功的回调
  onSuccess?: (data: T) => void
  // 请求失败的回调
  onError?: (error: any) => void
  // 请求完成的回调（无论成功还是失败）
  onFinally?: () => void
}
/**
 *  2）返回结果的类型定义；
 * https://cn.vuejs.org/guide/typescript/composition-api.html#typing-ref
 * @Ref ref的ts用法
 * (config?: AxiosRequestConfig) => Promise<T> 函数返回值是一个 Promise 对象，解析后的数据类型是 T
 *  结合Promise特性： await 或 .then() 接收成功的响应数据，.catch()捕捉请求失败的错误
 *
 */
export interface UseRequestReturn<T> {
  // 加载状态
  loading: Ref<boolean>
  // 错误信息
  error: Ref<any>
  // 响应数据
  data: Ref<T | undefined>
  //   手动触发
  run: (config?: AxiosRequestConfig) => Promise<T>
}
/**
 *  3）实现 useRequest 函数
 * TS用法解释
 * @param useRequest<T>:  声明函数使用泛型 T
 * @param requestFn:（）=> Promise<T> 回调函数返回值是一个 Promise 对象
 * 函数名后加 : 类型 → 规定函数必须返回这个类型的值
 * export function useRequest<T>(): UseRequestReturn<T> {
 * UseRequestReturn<T> 表示：useRequest 函数的返回值必须符合 UseRequestReturn<T> 这个类型（接口）的结构
 * @as 类型断言 ：强制告诉编译器ref的类型
 * }
 */
export function useRequest<T>(
  requestFn: (config?: AxiosRequestConfig) => Promise<T>,
  options: UseRequestOptions<T> = {},
): UseRequestReturn<T> {
  const { auto = true, deps = [], initialData, onBefore, onSuccess, onError, onFinally } = options
  const data = ref<T | undefined>(initialData) as Ref<T | undefined>
  const loading = ref(false)
  const error = ref<any | null>(null) // 执行请求
  //   请求的函数调用该函数便会真正发出请求，会调用配置项中传入4个回调
  const executeRequest = async (config?: AxiosRequestConfig): Promise<T> => {
    try {
      onBefore?.()
      loading.value = true
      error.value = null // 执行请求函数
      // [Promise 等待点] await 暂停执行，等待 requestFn resolve
      const result = await requestFn(config)
      console.log('result', result)
      data.value = result
      onSuccess?.(result)
      // [Promise 链返回值] 返回成功的数据
      return result
    } catch (err) {
      // [Promise 错误捕获]
      error.value = err
      onError?.(err)
      // [Promise 异常抛出] 将错误继续向外抛出，让调用者也能捕获到
      throw err
    } finally {
      loading.value = false
      // [Promise 结束阶段] 无论成功失败都会执行
      onFinally?.()
    }
  }
   // 手动触发请求
  const run = (config?: AxiosRequestConfig): Promise<T> => {
    return executeRequest(config)
  } 
  // 自动请求
  if (auto) {
    executeRequest()
  }
  // 依赖追踪 如果deps有值，则监听其变化，重新发送请求
  if (deps.length > 0) {
    watch(
      deps,
      () => {
        executeRequest()
      },
      { deep: true },
    )
  }

  return {
    data,
    loading,
    error,
    run,
  }
}
