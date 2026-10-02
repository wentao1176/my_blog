# 韦@舀 · 个人博客

雾蓝山水、宋体手记与竹笛意境的个人博客。Astro + TypeScript + Markdown，支持移动端、深浅主题、搜索、分类标签、归档、阅读目录、RSS 与站点地图。

首页山水、雾光和光点会自动持续运动，球拍标志轻缓摇动；首屏文字分层展开，页面内容随滚动进入视口时逐块展开，离开后重新进入会重播。新页面和浏览器返回同样支持展开。保留鼠标视差和 3D 卡片倾斜，尊重系统「减少动态效果」设置，后台页面自动暂停动画，无 JavaScript 时内容仍可阅读。

## GitHub Pages 直接部署

仓库内的 **`docs/` 是完整构建好的静态网站**，不需要在服务器上安装 Node。它包含首页、全部文章、资源、RSS、站点地图和 `.nojekyll`，页面资源和站内导航使用相对路径，适配根目录和子目录。

方式一：在仓库 **Settings → Pages → Build and deployment** 选择 **Deploy from a branch**，分支选 **main**，文件夹选 **/docs**，保存。

方式二（后续写作推荐）：同一位置将 Source 设为 **GitHub Actions**。内置 `.github/workflows/deploy.yml` 会在推送到 main 时检查、构建并发布，或手动触发工作流。两种方式任选其一。

工作流会检查 Pages 的发布模式：未启用 Pages 或使用分支部署时，只构建验证并保存产物；选择 GitHub Actions 后才执行在线部署，避免两种发布方式互相干扰。

发布成功后的预期地址：`https://www.xuanwentao.cn/`。是否已上线请以仓库 Pages 设置和部署结果为准。

## 文件结构

```text
my_blog/
├── docs/                    # GitHub Pages 可直接发布的静态网站（已提交）
│   ├── index.html
│   ├── .nojekyll
│   ├── _astro/              # 构建后的 CSS / JS
│   ├── images/
│   ├── posts/               # 文章列表和详情
│   ├── categories/          # 分类页
│   ├── tags/                # 标签页
│   ├── archives/, music/, about/, projects/, friends/
│   ├── 404.html
│   ├── rss.xml
│   └── sitemap-index.xml
├── src/
│   ├── config.ts            # 名称、个人资料、导航、音乐、集成开关
│   ├── content/posts/       # Markdown 原稿
│   ├── content.config.ts    # 内容元数据验证
│   ├── components/          # 可复用界面组件
│   ├── layouts/             # 全局页面布局
│   ├── lib/                 # 内容查询和路径处理
│   ├── pages/               # 页面及静态数据端点
│   ├── scripts/             # 搜索、导航、主题、复制交互
│   └── styles/
├── public/                  # 原始静态资源与 .nojekyll
├── planning/                # 设计、实现和集成说明，不发布到网站
├── tests/                   # 草稿、排序、搜索、子路径测试
└── .github/workflows/       # 自动构建部署
```

## 本地开发

需要 Node.js 22.12+（或 Astro 支持的更新版本）。

```sh
npm ci
npm run dev
```

打开终端显示的地址，使用根路径 `/`。生产预览：`npm run build` 后运行 `npm run preview`。

```sh
npm test
npm run check
npm run build
npm run verify:build
```

构建会重新生成 `docs/`。请修改 `src/` 和 `public/`，不要直接编辑构建文件。使用分支部署时，把更新的源码和 `docs/` 一起提交；使用 Actions 时，会自动从源码构建。

## 写文章

在 `src/content/posts/` 新建 `.md` 文件，文件名是文章地址：

```yaml
---
title: 我的第一篇文章
description: 一段简短摘要
date: 2026-10-02
category: 生活随记
tags: [随笔, 日常]
featured: true
draft: false
cover: mountain
---
```

正文使用 Markdown。封面可选 `mountain`、`lake`、`bamboo`；置顶区域由 `featured` 控制。`draft: true` 的文章不会进入页面、搜索索引、RSS 和站点地图。当前四篇文章均为明确标注的示例，替换为自己的内容即可。

## 自定义与扩展

- 修改 `src/config.ts` 配置作者、导航、友链和音乐。
- 音乐区默认无音源，不自动播放。设置 `site.music.src` 为你有权使用的 HTTPS 音频地址后，启用原生音频控制。使用仓库本地音源时通过 `url('/audio/曲名.mp3')` 添加基础路径。
- 评论、统计和内容服务扩展见 [集成说明](planning/INTEGRATIONS.md)。
- 山水素材说明与生成提示见 [素材记录](planning/ASSETS.md)。设计灵感参考 Astro Zen Blog 的克制布局，界面与实现为本项目定制。
- 更换域名或部署位置时，在 `deployment.config.mjs` 修改 `site` 与 `base`，或设置 `SITE_URL`、`BASE_PATH` 环境变量。自定义域名时在 `public/CNAME` 写入域名并重新构建。

## 内容许可

源码按 MIT License 提供。示例文章与本项目生成的山水图可随项目使用；第三方音乐与接入服务遵循其各自许可和条款。
