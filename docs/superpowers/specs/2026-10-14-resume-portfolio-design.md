# 郑宇韬 · 前端求职作品集网站 — 设计文档

- 日期：2026-10-14
- 状态：待用户复核
- 项目位置：`C:\Users\DELL\Desktop\简历\简历代码\resume-site`（独立仓库，与 Reactive Resume 单仓库解耦）

## 1. 目标与成功标准

**目标**：把郑宇韬的简历做成一个可直接部署到 GitHub Pages 的静态个人作品集网站，面向国内前端岗位的 HR / 面试官。

**成功标准**：
1. HR 打开首页 10 秒内能获取：姓名、求职意向、教育背景、核心经历、技术栈、联系方式。
2. 4 个项目有独立详情页，可单独分享链接。
3. 手机 / 平板 / 桌面三档自适应，无溢出、无遮挡。
4. 本地 `npm run dev` 可预览；`npm run build` 产物可直接托管到任意静态托管（含 GitHub Pages），无需预先知道仓库名。
5. 内容单一数据源，后续改简历只改 `src/data`。

**非目标（YAGNI）**：不做后台 / 数据库 / 登录；不做博客系统与文章列表；不做多语言切换；不做 PDF 在线生成（只提供已有 PDF 下载）；不做访客统计。

## 2. 技术栈与版本

| 项 | 选型 | 说明 |
|----|------|------|
| 运行时 | Node.js（用户本机 v22.22.1） | 已在用 |
| 构建 | **Vite 4.5.x** | 用户机器有 WDAC 策略屏蔽原生 `.node`；Vite 5+/6/7 依赖 Rollup 4 / Rolldown 原生二进制会被拦截，4.5.x 用纯 JS 的 Rollup 3，可跑 |
| 框架 | React 18 + TypeScript | |
| React 插件 | `@vitejs/plugin-react@4.x` | Babel 版，纯 JS |
| 样式 | Tailwind CSS 3 + 少量自定义 CSS | |
| 路由 | React Router v6 **HashRouter** | 避免 Pages 子路由刷新 404，免 404.html hack |
| 动效 | Framer Motion | 克制使用 |
| 字体 | Noto Serif SC（标题）、Inter / 系统字体（正文） | 走 Google Fonts 或本地 `public/fonts` |

## 3. 部署方案（用户自行托管）

- `vite.config.ts` 设 `base: './'`（相对路径）+ `HashRouter` → **无需知道仓库名**，放哪个子路径都能跑。
- `public/.nojekyll` → 防止 GitHub Pages 忽略下划线开头的产物目录。
- 提供 `.github/workflows/deploy.yml`：push `main` → 云端（Linux，无 WDAC）`npm ci` + `npm run build` → 发布到 Pages。用户也可改用「本地 build + 推 gh-pages 分支」。
- 仓库自带的 `README.md` 写清两种部署步骤。

## 4. 视觉规范（杂志设计感）

- **配色**：纸白底 `#FAFAF7`、墨黑 `#111111`、强调色 **朱砂橙 `#E4572E`**；辅助灰 `#6B6B6B`、分割线 `#E5E2DA`。
- **字体**：标题衬线（Noto Serif SC），正文无衬线，数字 / 标签等宽（JetBrains Mono 或系统等宽）。
- **排版手法**：章节编号 `01 / 02 / 03`、细分隔线、大留白、非对称栅格、超大字号标语、极淡纸纹。
- **照片处理**：白底证件照 **不做方正贴图**；Hero 区用「错位裁切 + 细边框 / 几何色块」的杂志式处理，抠白底后叠在版面上。
- **动效**：进入视口淡入上移、数字滚动、照片视差；时长 200–500ms，不做炫技。

## 5. 页面结构

### 5.1 首页（单页滚动 `/#/`）
1. **Hero**：姓名 + 「前端工程师」大标题 + 一句话定位 + 处理过的照片 + 「下载简历 PDF」按钮 + 联系图标
2. **关于 & 技能**：3–4 句自我介绍；技术栈三组标签（前端 / 移动 & 全栈 / AI 工具）
3. **经历时间线**：中科星图 → 浙江辉驿 → 像素生活，竖向时间轴，每条含时间 / 单位 / 角色 / 3 条量化要点
4. **精选项目**：4 张卡片 → 点击进入详情
5. **联系方式 + 页脚**：邮箱 / 电话 / 城市

### 5.2 项目详情页（`/#/project/:slug`，4 个同构）
头图 → 一句话概览 + 技术栈标签 → 背景与痛点 → 难点与方案（架构示意 / 关键代码片段）→ 成果数据 → 返回。

| slug | 标题 | 核心成果数据 |
|------|------|--------------|
| `zhongke-xingtu` | 中科星图 · 可拆卸子应用架构 | 3 个子应用独立构建/部署；同源同标签页接入；统一 HTTP 客户端 |
| `huiyi-erp` | 辉驿网络 · ERP 订单页重制 | 商务订单效率 +70%；获公司奖金 |
| `huiyi-okr` | 辉驿网络 · OKR 任务模块 | 数据库→前后端全流程；形成「目标-关键结果-任务」闭环 |
| `pixel-life` | 像素生活 · Android 全栈 | 5 张表 / 6 次版本迁移；OCR + 语音 + AI 三服务；后台定时提醒 |

## 6. 数据层

- `src/data/resume.ts`：个人信息、技能分组、经历（时间线数据）、项目摘要卡片。
- `src/data/projects/*.ts`：4 个项目详情长文（每项目一文件）。
- 类型定义在 `src/data/types.ts`，所有组件只从数据层取内容。

## 7. 组件划分

```
src/
  components/   SectionHeading, Tag, TimelineItem, ProjectCard, PhotoFrame, Button, Rule
  sections/     Hero, About, Experience, Projects, Contact, Footer
  pages/        Home, ProjectDetail, NotFound
  data/         resume.ts, types.ts, projects/*.ts
  assets/       photo(头像), 项目视觉占位
```

## 8. 简历文案改写要点（供用户复核）

原则：动词开头、量化结果、删「负责/参与」等虚词，每段压到 2–3 条。

- **中科星图 · 前端开发实习（2026.08~至今）**
  - 主导 3 个 React 子应用的可拆卸架构：基于 npm workspaces 独立构建与部署，开发态用 Vite `/apps/<name>` 反向代理打通主平台联调，生产态按路径交由 Nginx 托管，实现同源同标签页接入。
  - 实现跨应用路由级 Token 校验：路由变化即校验 token，失效 / 401 时清理会话并跳转登录；封装统一 HTTP 客户端，统一 Bearer 注入、业务码失败抛出、错误归一化与全局提示。
  - 推进组件化 / 模板化：沉淀 SearchTable、文件元数据列表、导入记录、回收站等模块，统一筛选、分页、列宽拖拽、操作列、pending 状态；页面 / 组件 / 请求 / 服务分层，降低子应用耦合。
  - 技术栈：React 19 + TypeScript + Ant Design + Vite；调研 CesiumJS / Leaflet 等 GIS 方案并本地化改造。
- **浙江辉驿网络科技 · 信息部实习生（2025.10~2026.05）**
  - 独立设计并开发 OKR 系统「任务」模块，覆盖数据库表设计到前后端全流程，上线后形成「目标-关键结果-任务」管理闭环。
  - 作为开发成员参与无线项目信息化系统建设，累计贡献 3000+ 行代码；独立开发 15 张业务报表与表单，支撑业务、工勘、仓管及管理层的日常使用与数据决策。
  - 设计多功能状态总览页：宏观统计 10+ 关键节点项目数量，支持报表 / 企微卡片多入口跳转详情页，直观展示超时、出错节点及原因，提升问题定位效率。
  - 重制 ERP 订单录入页，商务订单效率提升 **70%**，获公司奖金肯定。
- **像素生活（Pixel Life）· 全栈项目（2026.03~2026.07）**
  - Android 本地库存管理与保质期提醒应用，含库存管理、智能采购、设置三个模块。
  - 集成百度 OCR 拍照识别保质期、百度语音识别录入、DeepSeek AI 生成购物清单，Canvas 自绘柱状图 / 折线图展示消耗趋势；AlarmManager 实现应用未打开也能准时发送过期提醒。
  - 技术栈：Java + MVVM（Fragment→ViewModel→Repository→DAO）+ Room（5 张表、6 次版本迁移）+ LiveData / 线程池 + Navigation Component + ViewBinding + RecyclerView + HTTPURLConnection。
- **技能**
  - 前端：React / TypeScript / Vue3 / Vite / Ant Design / Tailwind
  - 移动 & 全栈：Java / Android（MVVM、Room）/ Node.js / REST / WebSocket
  - AI 工具：Dify / Claude Code / Codex / Trae / 本地大模型部署 / OpenClaw、AutoGLM 等开源 AI 项目
  - GIS（了解）：CesiumJS / Leaflet

## 9. 素材

| 素材 | 来源 | 状态 |
|------|------|------|
| 本人证件照 | `C:\Users\DELL\Desktop\简历\简历\证件照.jpg`（白底、竖版） | 已有，拷入 `public/images/` |
| 简历 PDF | `C:\Users\DELL\Desktop\郑宇韬计算机.pdf` | 已有，拷入 `public/` 供下载 |
| 项目截图 | 用户可选提供 | 待定，缺失则用生成的视觉图占位 |

> 注：AI 生成图仅用于项目卡片 / 详情页视觉占位，不用于本人照片。

## 10. 开放项（待用户确认）

1. **时间冲突**：简历中「中科星图 2026.08~至今」与「像素生活 2026.03~2026.07」区间重叠；且 2026.08 至今仅一个多月。需确认两段真实起止时间。
2. GitHub 用户名 / 仓库名：用户自行托管，配置已用 `base: './'` 规避，不阻塞。
3. 项目截图是否提供。
4. 强调色是否采用朱砂橙（备选靛蓝 `#2563EB`）。

## 11. 验收标准

- [ ] `npm run dev` 本地预览正常，无控制台报错。
- [ ] 首页 5 个板块内容完整、排版杂志感达标。
- [ ] 4 个项目详情页可访问，HashRouter 刷新不 404。
- [ ] 移动端（≤375px）与桌面端（≥1440px）布局正确。
- [ ] `npm run build` 成功，`dist/` 用相对路径可直接打开。
- [ ] 仓库含 `.github/workflows/deploy.yml`、`.nojekyll`、部署 README。
