import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, url } from '../lib/posts';
import { site } from '../config';
export async function GET(context: APIContext) {
  return rss({
    title: site.title,
    description: site.description,
    site: new URL(url('/'), context.site!),
    items: (await getPosts()).map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: url(`/posts/${post.id}/`),
    })),
    customData: '<language>zh-cn</language>',
  });
}
