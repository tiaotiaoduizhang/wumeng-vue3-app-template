<template>
  <!-- UnoCSS 的图标 -->
  <div v-if="type === 'uno'" :class="icon" />
  <!-- 本地 SVG 图标 -->
  <svg v-else-if="type === 'svg'" class="svg">
    <use :href="svgSymbolId" fill="currentColor" />
  </svg>
  <!-- IconFont 图标 -->
  <i v-else-if="type === 'iconfont'" :class="iconfontClassName" />
  <span v-else>Unsupported type: {{ type }}</span>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
defineOptions({ name: 'Icon' })
/**
 * withDefaults（） 默认值辅助函数
 * defineProps<{ ... }>()
 *  Icon 图标类型：
 * - uno  对应的 icon 属性：https://icones.js.org/
 * - iconify: Iconify 图标，对应的 icon 属性： https://icon-sets.iconify.design/
 * - svg：本地 SVG 图标
 * - iconfont：IconFont 图标
 */
const props = withDefaults(
  defineProps<{
    type?: 'uno' | 'svg' | 'iconify' | 'iconfont'
    icon?: string
    prefix?: string
    fontFamily?: string
    fontUrl?: string
  }>(),
  {
    type: 'iconify',
    prefix: 'icon',
    fontFamily: 'iconfont',
  },
)
/**
 * 动态加载 iconfont 字体样式文件
 * 1. 按需加载
 * 2. 避免重复加载
 * 3. 时机合理 onBeforeMount 能保证当 iconfont 的 <i> 标签渲染到页面时，样式已经加载完成
 */

onBeforeMount(() => {
  if (props.type === 'iconfont' && props.fontUrl) {
    // 第一步：检查页面中是否已经加载过该字体文件（避免重复加载）
    const existingLink = document.querySelector(`link[href="${props.fontUrl}"]`)
    if (!existingLink) {
      // 第二步：如果没加载过，创建 <link> 标签
      const link = document.createElement('link')
      link.rel = 'stylesheet' // 声明是样式表文件
      link.href = props.fontUrl // 字体文件的地址
      // 第三步：把 <link> 标签添加到页面的 <head> 中，加载样式
      document.head.appendChild(link)
    }
  }
})
const svgSymbolId = computed(() => `#${props.prefix}-${props.icon}`)
const iconfontClassName = computed(() => `${props.fontFamily} ${props.prefix}-${props.icon}`)
</script>

<style scoped lang="scss">
.svg {
  @apply inline-block align-mid;
  width: 1rem;
  height: 1rem;
}
</style>
