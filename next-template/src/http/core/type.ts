/**
 * 通用响应结构（ code、data、message）
 * T 泛值参数T是ts中用于创建可复用组件的工具（占位）
 * T ：代表“某种类型”（单数）。
 * T[] ：代表“某种类型的数组”（复数）。
 */
export interface ApiResp<T = any> {
  code: number
  message: string
  data: T
}
/**
 * 分页请求结构
 */
export interface PageReq {
  pageNum: number
  pageSize: number
}
/**
 * 分页响应数据结构
 */
export interface PageData<T = any> {
  total: number
  list: T[]
}
/**
 * 通用响应结构的设计
 * 1. 统一返回结构
 * 2. 混合返回结构（成功裸数据，失败错误结构）
 * 个人看法不推荐2
 */
