//UnoCSS 在 Vite 中生效的关键步骤，它会注入所有生成的实用工具类样式。
import 'virtual:uno.css'
import '@/assets/scss/index.scss';
/**
 * 导入 SVG 图标注册插件
 */
import 'virtual:svg-icons-register' 
/**
 * 空方法，通过调用该方法，导入上面 import 中的样式和资源
 */
export const installAssets = () => {

}
