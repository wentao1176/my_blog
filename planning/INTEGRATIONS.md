# 扩展接口

## 评论

在 GitHub 仓库开启 Discussions，访问 https://giscus.app/zh-CN 生成配置，将 repo、repoId、category、categoryId 填入 `src/config.ts` 的 `site.integrations.giscus`，并将 enabled 设为 true。未启用或缺少必要配置时不加载评论脚本。不需要访问令牌；不要将秘密写入站点源码。

## 统计

将已选服务的公开客户端脚本 URL 填入 `site.integrations.analytics.scriptUrl`。默认空值，不加载第三方统计。需要额外 data 属性的服务可在 `src/layouts/Layout.astro` 的统计脚本处扩展。

## 音乐

`site.music` 包含 title、subtitle、src。src 默认空值，界面显示准备状态。可连接支持浏览器播放的音频 URL；建议将有权使用的 MP3 放到 public/audio，通过基础路径函数生成 src。播放器由浏览器原生 audio 元素提供播放、暂停、音量和进度，默认 preload=none，不自动播放。加载失败提供可见反馈。服务端密钥不应出现在音频 URL 中。

## 友链与项目

`site.friends` 为 `{ name, url, description }[]`，空数组展示空状态。项目在 `src/pages/projects.astro` 维护，后续可提取为内容集合。

## CMS 或 API

现有界面通过 `src/lib/posts.ts` 的 `getPosts(): Promise<CollectionEntry<'posts'>[]>` 查询文章，并在页面层使用 Astro 的 render 处理 Markdown。对接 CMS 时应提供经过同样元数据验证的内容，并替换内容 loader；若替换为其他正文格式，也要同步调整文章详情的 render。不要直接将未经验证的 HTML 注入页面。

`search.json` 是已发布文章的公开静态索引，可供后续外部搜索消费。当前浏览器搜索直接筛选文章卡片，不依赖额外网络请求。

## SEO 与部署路径

`astro.config.mjs` 的 site 是站点源地址，base 是 /my_blog。`url()` 用于内部链接与资源。RSS、站点地图、canonical 与 robots 都随基础路径生成。迁移到自定义域名时将 base 改为 /，同时更新 site，重新构建。
