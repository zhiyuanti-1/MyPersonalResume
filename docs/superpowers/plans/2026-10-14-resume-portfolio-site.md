# 郑宇韬 · 前端求职作品集网站 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 `resume-site/` 生成一个 React 静态作品集网站，本地可预览，构建产物可直接托管到 GitHub Pages。

**Architecture:** 单页滚动首页（Hero/关于/经历/项目/联系）+ HashRouter 驱动的 4 个项目详情子路由；所有文案来自 `src/data` 单一数据源；Tailwind 3 承载杂志风设计系统。

**Tech Stack:** React 18、TypeScript、Vite 4.5.x、Tailwind CSS 3、React Router v6（HashRouter）、Framer Motion、Noto Serif SC。

**Spec:** `resume-site/docs/superpowers/specs/2026-10-14-resume-portfolio-design.md`

## Global Constraints

- 构建工具固定 **Vite 4.5.x** + `@vitejs/plugin-react@4.x`（用户机器 WDAC 屏蔽原生 `.node`，Vite 5+/Rollup 4/Rolldown 会被拦截）。
- `vite.config.ts` 必须 `base: './'`；路由必须 `HashRouter`（仓库名未知、Pages 子路径刷新不 404）。
- 文案全部中文；组件内不得硬编码简历内容，一律取自 `src/data`。
- 配色固定：纸白 `#FAFAF7`、墨黑 `#111111`、朱砂橙 `#E4572E`、辅助灰 `#6B6B6B`、分割线 `#E5E2DA`。
- 标题字体 Noto Serif SC，正文无衬线，数字/标签等宽。
- 简历 PDF 与证件照从桌面拷贝进 `public/`；项目头图由用户后续提供，先用占位视觉图。
- 数据层仅存相对路径（如 `images/photo.jpg`），组件渲染统一用 `import.meta.env.BASE_URL` 拼接 URL（与 `base: './'` 兼容，Pages 子路径可用）。
- 时间线日期保持简历原样（中科星图 2026.08~至今、辉驿 2025.10~2026.05、像素生活 2026.03~2026.07）。

## Review Focus

- `base: './'` 下，`public/` 静态资源与 `src/assets` 图片路径在构建产物中必须可用（HashRouter 子路由下相对路径不串位）。
- 375px 窄屏：杂志大字标题、时间线、项目卡片不得横向溢出。
- 图片缺失/加载失败时布局不塌陷（占位底色兜底）。
- 长中文标题在超大字号下断行美观，不出现单字孤行。
- 字体（Noto Serif SC）加载失败时回退到系统衬线，排版不崩。

---

### Task 1: 项目脚手架与构建配置

**Files:**
- Create: `resume-site/package.json`、`vite.config.ts`、`tsconfig.json`、`tsconfig.node.json`、`index.html`、`postcss.config.js`、`tailwind.config.js`、`.gitignore`、`public/.nojekyll`

**Interfaces:**
- Produces: 可运行的空壳工程；`npm run dev`（5173）、`npm run build`、`npm run preview`。

- [ ] **Step 1: 建目录并写 package.json（锁版本）**

```json
{
  "name": "resume-site",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^11.3.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.39",
    "tailwindcss": "^3.4.6",
    "typescript": "^5.5.3",
    "vite": "4.5.3"
  }
}
```

- [ ] **Step 2: `vite.config.ts` 设 base**

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: { port: 5173, host: true },
  build: { outDir: "dist", assetsDir: "assets" },
});
```

- [ ] **Step 3: Tailwind / PostCSS 配置**

`tailwind.config.js` content 扫 `./index.html`、`./src/**/*.{ts,tsx}`，theme.extend 写入 spec 配色与 `fontFamily.serif`（`Noto Serif SC`, serif）、`fontFamily.mono`。`postcss.config.js` 挂 `tailwindcss` + `autoprefixer`。

- [ ] **Step 4: `index.html` 引入字体与根节点**

head 内引入 Google Fonts（Noto Serif SC + Inter），`<div id="root">`，`<script type="module" src="/src/main.tsx">`，`lang="zh-CN"`，title `郑宇韬 · 前端工程师`。

- [ ] **Step 5: 安装依赖并验证**

Run: `npm install`；`npm run dev`
Expected: 5173 端口打开无报错（此时页面可为空）。
前置检查：确认 `node_modules/vite/package.json` 版本为 4.5.x；若 npm 解析到 5+/Rollup 4，删除 `node_modules` 与 `package-lock.json` 后重装并确认 vite 版本。

- [ ] **Step 6: 提交**

```bash
git init && git add -A && git commit -m "chore: scaffold vite 4.5 react ts site"
```

### Task 2: 设计系统与通用组件

**Files:**
- Create: `src/index.css`、`src/main.tsx`、`src/App.tsx`（占位）、`src/components/{SectionHeading,Tag,Rule,Button,PhotoFrame}.tsx`

**Interfaces:**
- Produces: `SectionHeading({index,title,subtitle})`、`Tag({children})`、`Rule()`、`Button({href,variant,children})`、`PhotoFrame({src,alt})`。

- [ ] **Step 1: `src/index.css` 写 Tailwind 指令 + 设计令牌**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --paper: #fafaf7;
  --ink: #111111;
  --accent: #e4572e;
  --muted: #6b6b6b;
  --rule: #e5e2da;
}
body { background: var(--paper); color: var(--ink); font-family: Inter, system-ui, "PingFang SC", "Microsoft YaHei", sans-serif; }
.display { font-family: "Noto Serif SC", "Songti SC", serif; letter-spacing: 0.01em; }
.paper-grain { background-image: radial-gradient(rgba(0,0,0,.025) 1px, transparent 1px); background-size: 3px 3px; }
```

- [ ] **Step 2: 通用组件**

`SectionHeading` 渲染 `01 / 章节标题` 的杂志式抬头（大序号等宽 + 衬线标题 + 细分割线）。`Tag` 为描边小标签，hover 变朱砂橙。`Rule` 为 1px 分割线。`Button` 支持 `variant: "solid" | "ghost"`。`PhotoFrame` 负责证件照杂志式呈现（见 Task 5）。

- [ ] **Step 3: 验证**

Run: `npm run dev`，在 `App.tsx` 临时渲染四类组件
Expected: 配色、字体、标签正常；无 TypeScript 报错。

### Task 3: 数据层

**Files:**
- Create: `src/data/types.ts`、`src/data/resume.ts`、`src/data/projects/{zhongke-xingtu,huiyi-erp,huiyi-okr,pixel-life}.ts`、`src/data/projects/index.ts`

**Interfaces:**
- Produces: `Profile`、`SkillGroup`、`ExperienceItem`、`ProjectSummary`、`ProjectDetail` 类型；`profile`、`skillGroups`、`experiences`、`projectSummaries`、`projectsBySlug`。

- [ ] **Step 1: `types.ts`**

```ts
export type Profile = { name: string; role: string; tagline: string; gender: string; birth: string; city: string; education: string; email: string; phone: string; photo: string; resumeFile: string };
export type SkillGroup = { title: string; items: string[] };
export type ExperienceItem = { period: string; org: string; role: string; stack?: string; bullets: string[] };
export type ProjectSummary = { slug: string; title: string; subtitle: string; tags: string[]; cover: string };
export type ProjectDetail = ProjectSummary & { overview: string; background: string[]; challenges: { title: string; detail: string }[]; metrics: { label: string; value: string }[]; };
```

- [ ] **Step 2: `resume.ts` 写入 spec 第 8 节全部文案**

`profile` 按简历填（郑宇韬 / 前端工程师 / 男 / 2004-11 / 浙江省金华市 / 浙江理工大学 数字媒体技术 本科 / 3208152881@qq.com / 15988559813 / `images/photo.jpg` / `resume.pdf`）。`skillGroups` 三组：前端、移动 & 全栈、AI 工具（另附 GIS 了解项）。`experiences` 三条，`bullets` 用 spec 第 8 节改写后的量化要点（中科星图 4 条、辉驿 4 条、像素生活 3 条）。

- [ ] **Step 3: `projects/*.ts` 写 4 个详情**

每个文件导出 `ProjectDetail`：`slug`、标题、副标题、tags、cover、overview、background（2 条）、challenges（2–3 条：标题 + 方案）、metrics（3–4 个数值，用简历真实数据：3 个子应用 / +70% / 3000+ 行 / 15 张报表 / 5 张表 6 次迁移 / 10+ 节点）。`index.ts` 汇总为 `projectsBySlug` 与 `projectSummaries`。

- [ ] **Step 4: 验证**

Run: `npx tsc --noEmit`
Expected: 无类型错误；`projectsBySlug` 含 4 个 key。

### Task 4: 路由骨架与首页布局

**Files:**
- Create: `src/pages/Home.tsx`、`src/pages/ProjectDetail.tsx`（占位）、`src/pages/NotFound.tsx`；Modify: `src/App.tsx`、`src/main.tsx`；Create: `src/components/ScrollToTop.tsx`

**Interfaces:**
- Consumes: Task 3 的 `profile`、`projectsBySlug`。
- Produces: 路由 `/`（Home）与 `/project/:slug`（ProjectDetail）。

- [ ] **Step 1: `App.tsx` 挂 HashRouter**

```tsx
import { HashRouter, Route, Routes } from "react-router-dom";
export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}
```

- [ ] **Step 2: `Home.tsx` 组装 5 个 section 占位**

按顺序渲染 `<Hero/><About/><Experience/><Projects/><Contact/><Footer/>`，每个 section 先给最小外壳后再在后续 Task 填充。

- [ ] **Step 3: 验证**

Run: `npm run dev`
Expected: `#/` 打开首页；手改地址为 `#/project/pixel-life` 不 404；`#/x` 命中 NotFound。

### Task 5: Hero 区

**Files:**
- Create: `src/sections/Hero.tsx`

- [ ] **Step 1: 结构**

左侧：`display` 超大姓名 + 「前端工程师」+ 一句话定位 + `Button`（下载简历 PDF，`href = import.meta.env.BASE_URL + profile.resumeFile`）+ 邮箱/电话/城市图标行。右侧：`PhotoFrame`（图片 `src = import.meta.env.BASE_URL + profile.photo`）。

- [ ] **Step 2: 杂志式照片处理（`PhotoFrame`）**

白底证件照不方正贴图：容器设固定宽高比，图片 `object-cover` + `object-top`，叠加 1px 墨黑细边框与朱砂橙色块角标（绝对定位的小矩形），图片整体向右上偏移、边框向左下错位，形成错版感。

- [ ] **Step 3: 验证**

Run: `npm run dev`
Expected: 桌面/375px 下照片与标题均不溢出；照片缺失时容器显示纸灰底色不塌陷。

### Task 6: 关于 & 技能区

**Files:**
- Create: `src/sections/About.tsx`

- [ ] **Step 1:** 左侧 3–4 句自我介绍（取 `profile.tagline` 扩展文案），右侧遍历 `skillGroups`，每组一个 `Tag` 集合，组标题用小号等宽大写。

- [ ] **Step 2: 验证** Run: `npm run dev` → 三组技能标签排列整齐，长标签换行不溢出。

### Task 7: 经历时间线

**Files:**
- Create: `src/components/TimelineItem.tsx`、`src/sections/Experience.tsx`

**Interfaces:**
- Consumes: `experiences`。Produces: `TimelineItem({item,index})`。

- [ ] **Step 1:** 左侧竖向细线 + 圆点，右侧每项：`period`（等宽）/ `org`（衬线大字）/ `role`（朱砂橙）/ `stack`（小字）/ `bullets`（2–3 条，spec 量化文案）。

- [ ] **Step 2: 验证** Run: `npm run dev` → 三条经历顺序正确、要点可读、窄屏不溢出。

### Task 8: 精选项目网格

**Files:**
- Create: `src/components/ProjectCard.tsx`、`src/sections/Projects.tsx`

**Interfaces:**
- Consumes: `projectSummaries`。Produces: `ProjectCard({project})` → 链到 `#/project/:slug`。

- [ ] **Step 1:** 非对称网格（首个卡片跨 2 列），卡片含封面图、`title`、`subtitle`、`tags`，hover 上浮 + 朱砂橙下划线。

- [ ] **Step 2: 验证** Run: `npm run dev` → 点任意卡片进入对应详情页。

### Task 9: 联系方式与页脚

**Files:**
- Create: `src/sections/Contact.tsx`、`src/sections/Footer.tsx`

- [ ] **Step 1:** Contact 大字标语 + 邮箱/电话/城市链接（`mailto:` / `tel:`）。Footer 一行版权 + 「Built with React & Vite」。

- [ ] **Step 2: 验证** Run: `npm run dev` → 邮箱/电话链接可点。

### Task 10: 项目详情页

**Files:**
- Create: `src/pages/ProjectDetail.tsx`（实现）

**Interfaces:**
- Consumes: `projectsBySlug`。

- [ ] **Step 1:** 用 `useParams` 取 `slug`，命中则渲染头图 + 概览 + 技术栈标签 + 背景（`background`）+ 难点方案（`challenges`）+ 成果数据（`metrics` 大数字网格）+ 返回按钮；未命中渲染 NotFound。

- [ ] **Step 2: 验证** Run: `npm run dev` → 4 个 slug 均可访问，数据完整；错误 slug 落 NotFound。

### Task 11: 动效与响应式打磨

**Files:**
- Modify: `src/sections/*.tsx`、`src/index.css`

- [ ] **Step 1:** 用 Framer Motion `whileInView` 给各 section 加入场淡入上移（200–500ms）；Hero 照片加轻微视差；项目 `metrics` 数字做滚动计数。

- [ ] **Step 2:** 检查 375px / 768px / 1440px 三档；必要时用 `clamp()` 调大字号，禁止横向滚动条。

- [ ] **Step 3: 验证** Run: `npm run dev` → 三档宽度无横向溢出，动效不卡顿。

### Task 12: 素材接入与构建

**Files:**
- Create: `public/resume.pdf`、`public/images/photo.jpg`、`public/images/projects/*.jpg`（用户提供后）；Modify: `src/data/resume.ts`

- [ ] **Step 1:** 拷贝 `C:\Users\DELL\Desktop\简历\简历\证件照.jpg` → `public/images/photo.jpg`；拷贝 `C:\Users\DELL\Desktop\郑宇韬计算机.pdf` → `public/resume.pdf`；用户提供的项目截图 → `public/images/projects/`，并把 `cover` 路径写进数据层。

- [ ] **Step 2:** `npm run build` 通过；`npm run preview` 打开产物，确认 HashRouter、图片、PDF 下载在相对路径下正常。

- [ ] **Step 3: 提交** `git add -A && git commit -m "feat: complete portfolio site"`

### Task 13: 部署配置

**Files:**
- Create: `.github/workflows/deploy.yml`、`README.md`、`public/.nojekyll`（Task 1 已建，确认存在）

- [ ] **Step 1:** workflow：`on: push: branches: [main]`；job 用 `actions/checkout` → `actions/setup-node@v4`（node 20）→ `npm ci` → `npm run build` → `actions/upload-pages-artifact`（path `dist`）→ `actions/deploy-pages`；权限 `pages: write`、`id-token: write`。

- [ ] **Step 2:** README 写两种部署方式（Actions 自动 / 本地 build 推 gh-pages），并说明 `base: './'` 已适配任意仓库名。

- [ ] **Step 3: 验证** `npm run build` 产物 `dist/` 内相对路径正确（`index.html` 引用 `./assets/...`）。

## Self-Review

- **Spec 覆盖**：视觉规范→Task 2/11；首页 5 板块→Task 4–9；4 详情页→Task 10 + Task 3；数据层→Task 3；图片/PDF 素材→Task 12；部署→Task 13；文案改写→Task 3 Step 2。无遗漏。
- **占位符扫描**：无 TBD/TODO；每个 Task 给出文件与关键代码或具体做法。
- **类型一致性**：`ProjectSummary`/`ProjectDetail` 在 Task 3 定义，Task 8/10 引用同名；`PhotoFrame` 在 Task 2 定义、Task 5 使用。
- **Review Focus**：相对路径资源→Task 12 Step 2；375px→Task 11 Step 2；图片缺失兜底→Task 5 Step 3；长中文标题断行→Task 2/11；字体回退→Task 2 Step 1 的 `font-family` 回退链。
