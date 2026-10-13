# 知忆 · 认知观察

适合 iPhone 的家属观察工具，通过 GitHub Pages 链接打开，在 Safari 中可添加到主屏幕。

## 数据

初始档案和事件为空，不包含真实病史或记录。填写的健康信息仅保存在当前设备的浏览器 IndexedDB，不上传到 GitHub。没有账号或云同步，各设备独立保存。建议定期导出完整 JSON；清除网站数据或更换设备可能导致丢失。首次联网加载并完成缓存后可离线访问，首次离线不可用。

这不是诊断工具，不计算疾病风险评分。

## 开发

Node.js 24，npm ci，npm run test。构建使用 NEXT_PUBLIC_BASE_PATH=/zhiyi-care-journal npm run build。Actions 自动部署 out。默认项目子路径由仓库名决定，PDF字体与主屏幕图标随应用分发。

原生手机工程仍保留在本地项目，不在此仓库。Noto Sans SC 使用 SIL Open Font License（public/fonts/OFL.txt）。
