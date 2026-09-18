# 上线测试前任务规划

本清单用于 v0.3 正式上线前的测试阶段。测试阶段完成前，不推送或合并到 `main`。

## 1. 本地功能测试

- [ ] 首页桌面端访问
- [ ] 首页移动端访问
- [ ] Ideas 列表页访问
- [ ] Explore 列表页访问
- [ ] Observe 列表页访问
- [ ] About 页面访问
- [ ] 三篇现有文章详情页访问
- [ ] 文章内部 Markdown/MDX 标题、段落和列表渲染
- [ ] TypeScript 代码块语法高亮
- [ ] 文章日期、tags 和预计阅读时间显示
- [ ] Hero map 节点、状态灯和最新文章标题显示
- [ ] Hero map 五条连接线和五个节点布局
- [ ] 404 页面和返回首页
- [ ] 错误页的 TRY AGAIN 和 RETURN HOME
- [ ] Loading 页面

## 2. 响应式和视觉测试

- [ ] 1280px 及以上桌面视口
- [ ] 1024px 平板视口
- [ ] 768px 平板视口
- [ ] 390px 移动视口
- [ ] 375px 移动视口
- [ ] 检查所有页面是否有横向溢出
- [ ] 检查长标题和长 tag 的换行
- [ ] 检查列表页模块名与日期排列
- [ ] 检查文章详情页 metadata 间距
- [ ] 检查 Hero map 长节点文字和底部节点间距
- [ ] 检查 footer 在移动端的列布局
- [ ] 检查中文字体实际加载效果

## 3. 键盘和可访问性测试

- [ ] 使用 Tab 依次访问 Skip to content、Logo、主导航、页面链接和 footer 链接
- [ ] 使用 Shift + Tab 反向移动焦点
- [ ] 焦点始终有清晰可见的绿色轮廓
- [ ] 在 Skip to content 上按 Enter 后跳到正文
- [ ] 使用 Enter 激活链接和按钮
- [ ] 使用 Space 激活按钮
- [ ] 检查页面 heading 层级
- [ ] 检查 SVG map 的 aria-label 和 title 说明
- [ ] 开启 `prefers-reduced-motion` 后确认动画被降低或停止
- [ ] 检查文字和背景对比度

## 4. SEO 和静态产物测试

- [ ] 检查每个页面的 title
- [ ] 检查每个页面的 description
- [ ] 检查 canonical URL
- [ ] 检查 Open Graph metadata
- [ ] 检查 Twitter metadata
- [ ] 检查 `robots.txt`
- [ ] 检查 `sitemap.xml`
- [ ] 检查所有静态详情页都出现在 `out/`
- [ ] 检查 Open Graph 图片和 favicon
- [ ] 使用真实 `NEXT_PUBLIC_SITE_URL` 构建一次

## 5. 部署前工程检查

- [ ] 运行 `npm ci`
- [ ] 运行 `npm run check`
- [ ] 检查 `git diff --check`
- [ ] 检查 `git diff`
- [ ] 确认没有密钥、token 或本地路径进入仓库
- [ ] 检查 GitHub Actions YAML
- [ ] 确认 GitHub Secrets 已配置
- [ ] 确认 ECS release 目录权限
- [ ] 确认 Nginx 指向 `/var/www/valbeta/current`
- [ ] 确认 HTTPS、证书和 HSTS

## 6. 真实 ECS 测试

- [ ] 在测试条件下执行一次 GitHub Actions 构建
- [ ] 执行一次 ECS release 部署
- [ ] 访问首页和主要内容 URL
- [ ] 访问 `robots.txt` 和 `sitemap.xml`
- [ ] 检查 Nginx 安全响应头
- [ ] 检查静态资源和字体是否从本站加载
- [ ] 验证 `current` 符号链接
- [ ] 使用旧 release 完成一次回滚演练
- [ ] 检查访问日志和错误日志

## 7. 测试完成标准

- [ ] 本清单中的阻塞项全部完成
- [ ] 没有已知的页面级阻塞问题
- [ ] 没有横向溢出或主要内容缺失
- [ ] 没有构建、类型或内容校验错误
- [ ] 真实 ECS 部署和回滚均成功
- [ ] 测试反馈已整理为待修复问题
- [ ] 修复后再次运行 `npm run check`
- [ ] 用户确认可以进入合并或发布流程
