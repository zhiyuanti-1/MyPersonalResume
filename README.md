# 郑宇韬 · 前端工程师作品集

一个用 React + TypeScript + Vite 构建的静态个人作品集网站，面向前端岗位的 HR 与面试官。含单页滚动首页与 4 个项目详情页，构建产物可直接托管到 GitHub Pages。

- 技术栈：React 18、TypeScript、Vite 4.5、Tailwind CSS 3、React Router v6（HashRouter）、Framer Motion
- 内容单一数据源：`src/data/`，改简历只需改数据文件
- 静态资源：`public/images/photo.jpg`（证件照）、`public/resume.pdf`（简历下载）

> 本项目是**独立的 npm 工程**，不需要 Node 24、也不需要 pnpm，任意较新的 Node（建议 18+）配 npm 即可。

## 本地开发与预览

```bash
npm install        # 安装依赖
npm run dev        # 本地开发，默认 http://localhost:5173
npm run build      # 类型检查 + 生产构建，产物在 dist/
npm run preview    # 本地预览构建产物
```

首页地址为 `http://localhost:5173/#/`，项目详情页形如 `http://localhost:5173/#/project/pixel-life`。

## 部署

站点已用 `base: "./"`（相对路径）+ `HashRouter`，**无需知道仓库名**，放到任意子路径（如 `https://<用户名>.github.io/<仓库名>/`）都能正常运行；配合 `public/.nojekyll`，GitHub Pages 不会忽略下划线开头的产物目录。因此下面两种方式任选其一即可。

### 方式 A：GitHub Actions 自动部署（推荐）

仓库已内置 `.github/workflows/deploy.yml`：向 `main` 分支 push 后，云端自动执行 `npm ci` + `npm run build`，并把 `dist/` 发布到 Pages。

1. 把代码推到 GitHub 仓库的 `main` 分支。
2. 在仓库 **Settings → Pages → Build and deployment** 中，把 **Source** 设为 **GitHub Actions**。
3. 之后每次 push 到 `main` 都会自动构建并发布，无需手动操作。

> 注意：GitHub Actions 在 Linux 云端运行，不受本机限制；本地若无法直接构建，仍可依赖此方式。

### 方式 B：本地构建 + 推送 `gh-pages` 分支

不想用 Actions 时，可手动把构建产物推到 `gh-pages` 分支：

```bash
npm run build
cd dist
git init
git add -A
git commit -m "deploy"
git push -f https://github.com/<用户名>/<仓库名>.git main:gh-pages
```

随后在 **Settings → Pages → Build and deployment** 中把 **Source** 设为 **Deploy from a branch**，分支选 `gh-pages` / `/(root)`。

## 目录结构

```
src/
  components/   通用组件（SectionHeading、Tag、ProjectCard、PhotoFrame 等）
  sections/     首页各板块（Hero、About、Experience、Projects、Contact、Footer）
  pages/        Home、ProjectDetail、NotFound
  data/         简历数据单一数据源（resume.ts、projects/、types.ts）
public/         静态资源（照片、简历 PDF、.nojekyll）
```
