export const site = {
  name: '韦@舀',
  author: '韦@舀',
  title: '韦@舀 · 个人博客',
  description: '山水之间，记录代码、生活与偶然听见的笛声。',
  github: 'https://github.com/wentao1176',
  repository: 'https://github.com/wentao1176/my_blog',
  music: {
    title: '山间一曲',
    subtitle: '留一段时间，听风，也听自己。',
    src: '',
  },
  friends: [] as { name: string; url: string; description: string }[],
  integrations: {
    giscus: {
      enabled: false,
      repo: '',
      repoId: '',
      category: '',
      categoryId: '',
    },
    analytics: { scriptUrl: '' },
  },
};
export const nav = [
  ['首页', '/'],
  ['文章', '/posts/'],
  ['归档', '/archives/'],
  ['音乐', '/music/'],
  ['关于', '/about/'],
] as const;
