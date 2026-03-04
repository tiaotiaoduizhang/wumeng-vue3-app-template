<template>
  <!-- 语言切换按钮区域 -->
  <div class="flex gap-2">
    <button
      v-for="lang in languages"
      :key="lang.value"
      :class="{ active: currentLocale === lang.value }"
      @click="onChangeLanguage(lang.value)"
    >
      {{ lang.label }}
    </button>
  </div>
  <!-- 演示带参数的翻译：在模板中直接使用全局注入的 $t 函数 -->
  <!-- 对应翻译文件中的：welcome: 'Welcome, {name}!' -->
  <div>{{ $t('common.welcome', { name: '优雅哥' }) }}</div>

  <!-- 演示普通翻译 -->
  <div>{{ $t('home.title') }}</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

/**
 * useI18n 是 Vue I18n 的核心 Hook（Composition API）
 * 解构出我们需要的方法和属性：
 * - t: 翻译函数，在 script 中使用。用法 t('key', { param: 'value' })
 * - locale: 当前语言的响应式变量（Ref），修改 locale.value 即可全局切换语言
 */
const { t, locale } = useI18n()

// 调试输出：查看 t 函数和 locale 对象的结构
console.log('I18n instance:', { t, locale: locale.value })

// 将 locale 赋值给 currentLocale，用于在模板中判断当前选中的语言
// 注意：locale 是一个 Ref，所以 currentLocale 也是响应式的
const currentLocale = locale

// 定义支持的语言列表配置
const languages = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
]

/**
 * 切换语言的处理函数
 * @param lang 目标语言代码 (如 'zh-CN', 'en-US')
 */
const onChangeLanguage = async (lang: string) => {
  // 加载语言包
  await loadLanguage(lang)
  // 修改 locale.value 会自动触发整个应用所有使用 t/$t 的地方重新渲染
  locale.value = lang
}
</script>
