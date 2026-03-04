<template>
  <div class="">
    <div class="text-2xl text-danger">{{ $t('demo1.title') }}</div>
    <div>{{ $t('demo1.info') }}</div>
  </div>
</template>

<script setup lang="ts">
/**
 * 定义页面元数据
 * definePage: unplugin-vue-router 提供的 SFC 宏用于在页面组件内声明该页面的“路由选项”。
 * meta: 页面的元数据配置对象。
 * locales: 页面可能需要加载多个模块的语言包,定义字符串数组
 * 当页面被访问时，根据当前语言自动加载对应的翻译模块。
 */
definePage({
    meta: {
       locales: ['demo1'],
    }
})
</script>

<style scoped>

</style>