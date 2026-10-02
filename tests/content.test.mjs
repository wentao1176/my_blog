import test from 'node:test';
import assert from 'node:assert/strict';
import { withBase, published, matchesPost } from '../src/lib/content.mjs';
test('paths preserve project base without duplicate slashes', () => {
  assert.equal(withBase('/posts/hello/', '/my_blog/'), '/my_blog/posts/hello/');
  assert.equal(withBase('/', '/my_blog/'), '/my_blog/');
  assert.equal(withBase('images/hero.webp', '/'), '/images/hero.webp');
});
test('public content excludes drafts and sorts newest first', () => {
  const posts = [
    { id: 'old', data: { date: new Date('2025-01-01') } },
    { id: 'draft', data: { date: new Date('2026-10-01'), draft: true } },
    { id: 'new', data: { date: new Date('2026-01-01') } },
  ];
  assert.deepEqual(
    published(posts).map((p) => p.id),
    ['new', 'old'],
  );
  assert.equal(posts.length, 3);
});
test('Chinese search intersects category and handles whitespace', () => {
  const post = {
    data: {
      title: '山间的笛声',
      description: '慢下来听音乐',
      tags: ['竹笛'],
      category: '生活随记',
    },
  };
  assert.equal(matchesPost(post, ' 笛声 ', '生活随记'), true);
  assert.equal(matchesPost(post, '竹笛', '技术笔记'), false);
  assert.equal(matchesPost(post, '不存在', '全部'), false);
  assert.equal(matchesPost(post, '', '全部'), true);
});
