
import 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    /**
     * 是否禁用防重
     * 默认为 false (开启防重)
     */
    disableDedup?: boolean
    /**
     * 是否开启取消请求功能
     */
    enableCancel?: boolean
    /**
     * 是否开启防重功能
     */
    enableDedup?: boolean
  }
}
