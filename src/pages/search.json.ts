import { getPosts, url } from '../lib/posts';
export async function GET() {
  return new Response(
    JSON.stringify(
      (await getPosts()).map((post) => ({
        title: post.data.title,
        description: post.data.description,
        category: post.data.category,
        tags: post.data.tags,
        url: url(`/posts/${post.id}/`),
      })),
    ),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
  );
}
