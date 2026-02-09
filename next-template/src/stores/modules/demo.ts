import { defineStore } from 'pinia'
import { ref } from 'vue'
/**
 * 用途：demo 业务模块 组合式api用法
 * @export const  ES6 模块化的具名导出方式 用于将常量（如 Pinia 的 Store 函数）暴露给外部文件使用
 * @defineStore  用途 创建并定义一个 Store（可以理解为 “状态仓库”）
 * 参数 1：Store 唯一标识（id） 
 * 参数 2：核心定义（组合式 API（setup函数） 选项式 API（state,actions,getters ））
 * 参数 3：可选配置项 配置 Store 的额外行为
 * persist 开启状态持久化
 */
export const useDemoStore = defineStore(
  'demo', // 参数1：Store 唯一标识
  () => {
    // 参数2 Setup 函数 (类似组件的 setup())
    // 状态定义
    const counter = ref<number>(0)
    // Action 定义（修改状态的方法）
    const increment = () => {
      counter.value++
    }
    // 返回需要暴露的状态和方法
    return {
      counter,
      increment,
    }
  },
  {
    persist: true, // 开启状态持久化
  },
)
