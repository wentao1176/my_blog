---
title: 'lite-md-viewer：让 Markdown 阅读轻一点'
description: '一份纯文本，一扇清楚的阅读窗口。记录我的 Markdown 预览器，以及代码、公式与图表如何在同一页里相遇。'
date: 2026-10-03
category: '项目手记'
tags: ['开源', 'Markdown', 'Electron', 'Vue']
featured: false
cover: 'bamboo'
---

> 让工具退后一步，让文字走到眼前。

Markdown 很适合记录：几行标题、一段代码、一张表格，就能把零散的想法整理成文档。但当笔记逐渐变长，或者出现公式和流程图时，一份纯文本也需要一个清楚、安静的阅读窗口。

这篇手记介绍我的开源项目 **lite-md-viewer**。它是一款桌面 Markdown 编辑与预览工具，应用名称为 **WTMD**，把源码、排版和目录放在同一个工作空间里。

[查看 GitHub 项目](https://github.com/wentao1176/lite-md-viewer) · [下载发布版本](https://github.com/wentao1176/lite-md-viewer/releases)

## 从一份 .md 开始

打开文档后，左侧是 Markdown 源码，右侧是实时预览。改动文字时，能同时看到标题、段落与代码的呈现方式；需要专心阅读时，也可以切换到预览全屏。

长文档的侧边目录从标题生成，用来跳转到正在寻找的章节。源码与预览之间的分栏、目录宽度、字体和预览缩放，都可以按阅读习惯调整。

这些细节服务于同一件事：写的时候容易修改，读的时候容易找到重点。

## 让技术笔记完整地呈现

技术文档往往不只有段落。它可能是一段待复用的代码、一页推导，也可能是一张说明系统关系的图。

| 内容       | 对应的阅读能力             |
| ---------- | -------------------------- |
| 代码片段   | Shiki 语法高亮，代码块复制 |
| 数学表达   | KaTeX 行内公式与独立公式块 |
| 结构与流程 | Mermaid 图表渲染           |
| 长篇文档   | 标题目录与章节定位         |
| 图片资料   | 点击图片放大查看           |

这些内容都留在 Markdown 文档中，不需要把笔记拆成几种不同的文件格式。阅读代码、公式和图表的能力，来自各自专门的渲染工具，再由预览界面统一呈现。

## 留给阅读的空间

WTMD 提供三套主题，可以在不同光线下选择合适的界面。预览字体可以调整，缩放范围为 **50% 到 250%**，工具栏也能收起。

本地文档的编辑和渲染可以离线使用；检查更新与下载新版本则需要联网。文档中引用的远程图片等外部资源，也取决于对应资源是否可访问。

写完之后，桌面端还可以导出 **HTML 或 PDF**。导出时可选择页面底色，以及是否添加页码，方便把笔记留存或分享出去。

## 界面背后的几层结构

项目以 **Electron** 承载桌面窗口与系统能力，**Vue 3、Vite 和 TypeScript** 负责界面与开发构建。源码编辑区使用 **CodeMirror 6**，Markdown 解析使用 **markdown-it**，代码、公式和图表分别交给 Shiki、KaTeX 与 Mermaid。

目录结构也反映了这些职责：

```text
lite-md-viewer/
├── electron/          桌面主进程
├── src/
│   ├── components/    编辑、预览与工具栏组件
│   ├── engine/        Markdown 渲染与文档导出
│   └── App.vue        主界面与交互协调
├── android/           Android 客户端源码
└── .github/workflows/ 自动构建流程
```

桌面打包由 electron-builder 完成。Windows 安装包使用 NSIS；Linux 配置包含 Debian 安装包与 AppImage。更新通过 GitHub Releases 分发。

仓库还包含基于 **Kotlin、Jetpack Compose 和 Markwon** 的 Android 客户端，用于打开 Markdown 文件、渲染内容并通过系统打印服务导出 PDF。它有独立的实现，功能范围与桌面端有所不同；源码可在 Android Studio 中构建。

## 下载，或从源码运行

直接使用时，前往项目的 [Releases 页面](https://github.com/wentao1176/lite-md-viewer/releases)，选择对应系统的安装包。Windows 打包配置使用 `WTMD-Setup-版本号.exe` 命名；具体文件以发布页为准。

想看看实现，可以从源码启动：

```bash
git clone https://github.com/wentao1176/lite-md-viewer.git
cd lite-md-viewer
npm install
npm run dev
```

需要构建桌面安装包时，仓库提供了对应命令：

```bash
npm run electron:build:win
npm run electron:build:linux
```

## 一份工具，也是一页手记

这个项目把编辑与阅读放在一起，让纯文本笔记拥有完整的呈现方式。对博客而言，它也是一件可以持续记录的作品：界面如何调整，渲染如何组织，桌面应用如何构建与分发，都值得慢慢写下来。

项目采用 **MIT 许可证**。如果你也在使用 Markdown，欢迎去仓库看看源码，或者通过 Issues 留下问题与建议。

---

本文依据项目 [README](https://github.com/wentao1176/lite-md-viewer/blob/main/README.md)、[桌面界面源码](https://github.com/wentao1176/lite-md-viewer/blob/main/src/App.vue)与[打包配置](https://github.com/wentao1176/lite-md-viewer/blob/main/electron-builder.yml)整理，记录日期为 2026 年 10 月 3 日。功能与下载文件以仓库后续更新为准。
