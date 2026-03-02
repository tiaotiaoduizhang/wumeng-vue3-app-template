/**
 * 转换器配置(transformers)
 * transformerDirectives() 支持 @apply 指令
 * transformerVariantGroup() 支持分组
 * theme（主题配置） :自定义的css变量映射到unocss
 * rules 规则中使用主题
 * shortcuts  快捷方式 多个规则合成一个简写
 * presets 预设
 */

import {
  defineConfig,
  presetWind4,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

// UnoCSS 默认预设 (presetUno) 已经包含了 Tailwind 兼容性
// 目前 UnoCSS 尚未发布专门针对 Tailwind 4.0 的独立预设
// presetUno 会持续更新以跟进 Tailwind 的新特性
export default defineConfig({
  presets: [
    presetWind4({
      preflights: { reset: true },
    }),
    presetIcons({
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      // 品牌与状态色
      primary: 'var(--wm-color-primary)',
      success: 'var(--wm-color-success)',
      warning: 'var(--wm-color-warning)',
      danger: 'var(--wm-color-danger)',
      info: 'var(--wm-color-info)',
      // 文字色
      'text-primary': 'var(--wm-color-text-primary)',
      'text-regular': 'var(--wm-color-text-regular)',
      'text-secondary': 'var(--wm-color-text-secondary)',
      // 背景色
      'bg-page': 'var(--wm-bg-color-page)',
      'bg-base': 'var(--wm-bg-color-base)',
    },
    spacing: {
      xs: 'var(--wm-spacing-xs)',
      sm: 'var(--wm-spacing-sm)',
      md: 'var(--wm-spacing-md)',
      lg: 'var(--wm-spacing-lg)',
      xl: 'var(--wm-spacing-xl)',
      '2xl': 'var(--wm-spacing-2xl)',
    },
    fontSize: {
      xs: 'var(--wm-font-size-xs)',
      sm: 'var(--wm-font-size-sm)',
      md: 'var(--wm-font-size-md)',
      lg: 'var(--wm-font-size-lg)',
      xl: 'var(--wm-font-size-xl)',
      '2xl': 'var(--wm-font-size-2xl)',
      '3xl': 'var(--wm-font-size-3xl)',
    },
    borderRadius: {
      xs: 'var(--wm-border-radius-xs)',
      sm: 'var(--wm-border-radius-sm)',
      md: 'var(--wm-border-radius-md)',
      lg: 'var(--wm-border-radius-lg)',
      xl: 'var(--wm-border-radius-xl)',
    },
  },
  rules: [
    ...['primary', 'success', 'warning', 'danger', 'info'].flatMap((color) => [
      [`bg-${color}-light-3`, { 'background-color': `var(--wm-color-${color}-light-3)` }],
      [`bg-${color}-light-5`, { 'background-color': `var(--wm-color-${color}-light-5)` }],
      [`bg-${color}-light-7`, { 'background-color': `var(--wm-color-${color}-light-7)` }],
      [`bg-${color}-light-9`, { 'background-color': `var(--wm-color-${color}-light-9)` }],
      [`text-${color}-dark-2`, { color: `var(--wm-color-${color}-dark-2)` }],
    ]),
  ],
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'flex-col-center': 'flex flex-col justify-center items-center',
  },
})
