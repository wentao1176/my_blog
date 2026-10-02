---
title: '用 Markdown，搭建自己的数字花园'
description: '从一份纯文本出发，让写作保持简单，让网站拥有清晰而可扩展的结构。'
date: 2026-09-28
category: '技术笔记'
tags: ['Astro', 'Markdown', '博客']
featured: true
cover: 'lake'
---

> 示例技术笔记。代码以本博客实际内容结构为例。

## 内容与界面各司其职

写文章时，最好不用同时考虑页面组件。Markdown 负责内容，模板负责呈现，配置负责站点信息。这样的边界，让小博客也容易维护。

## 一篇文章的起点

在 `src/content/posts/` 下新建一个 `.md` 文件。文件名成为文章地址，顶部的元数据描述文章。

```yaml
---
title: 我的第一篇文章
description: 一小段文章摘要
date: 2026-10-02
category: 技术笔记
tags: [学习, 开发]
featured: false
draft: false
cover: mountain
---
```

### 草稿先留给自己

把 `draft` 设为 `true`，文章就不会进入公开列表、搜索索引或订阅源。准备好之后，再改为 `false`。

## 让路径跟着部署走

项目网站通常位于一个子路径下。文章链接、资源链接和 RSS 地址都需要经过同一个基础路径函数，才能避免本地正常、上线后失效。

```typescript
const articleUrl = url('/posts/hello-qinglan/');
// GitHub Pages: /my_blog/posts/hello-qinglan/
```

## 慢慢长成花园

先写好一篇，再写下一篇。分类和标签帮助整理思路，归档记录时间，而内容本身决定了这个空间的样子。
