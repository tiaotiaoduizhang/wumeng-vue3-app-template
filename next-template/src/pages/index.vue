<script setup lang="ts">
const msg = ref('Hello world')
// const toggleTheme = () => {
//   const html = document.documentElement
//   const currentTheme = html.getAttribute('data-theme')
//   html.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark')
// }

const isDark = useDark({
  selector: 'html', // 目标元素：将属性添加到 <html> 标签上
  attribute: 'data-theme', // 属性名：使用 data-theme 属性来标识主题
  valueDark: 'dark', // 暗黑值：暗黑模式时，设置 
  valueLight: 'light', // 亮色值：亮色模式时，设置 
})

const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="p-md">
    <div>{{ msg }}</div>
    <div class="demo mb-md">4种图标测试</div>
    <icon type="uno" icon="i-line-md:arrow-down-circle" class="size-8 text-primary" />
    <icon type="svg" icon="demo" class="text-primary size-8!" />
    <!-- 浏览器中渲染css,然后.icon-mobiletao:before 这个ico改为mobiletao -->
    <icon
      type="iconfont"
      font-url="//at.alicdn.com/t/c/font_3457715_h47rhjpli3n.css"
      icon="mobiletao"
      class="text-primary text-2xl!"
    />
    <div class="flex flex-col gap-sm">
      <div class="text-xs text-primary">测试文字 (Primary XS)</div>
      <div class="text-sm text-success">测试文字 (Success SM)</div>
      <div class="text-md text-info">测试文字 (Info MD)</div>
      <div class="text-base text-warning">测试文字 (Warning Base)</div>
      <div class="text-lg text-danger">测试文字 (Danger LG)</div>
      <div class="text-xl text-text-primary">测试文字 (Text Primary XL)</div>
      <div class="text-2xl text-text-regular">测试文字 (Text Regular 2XL)</div>
      <div class="text-3xl text-text-secondary">测试文字 (Text Secondary 3XL)</div>
    </div>

    <div>isDark: {{ isDark }}</div>
     <button @click="toggleDark()">Toggle</button>
  </div>
</template>

<style scoped lang="scss">
.demo {
  @apply text-xl text-primary bg-success-light-7 p-sm rounded-sm;
}
</style>
