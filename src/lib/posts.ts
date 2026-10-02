import { getCollection, type CollectionEntry } from 'astro:content';
import { published, withBase } from './content.mjs';
export const getPosts = async (): Promise<CollectionEntry<'posts'>[]> =>
  published(await getCollection('posts'));
export const url = (path: string) => withBase(path, import.meta.env.BASE_URL);
export const dateLabel = (date: Date) =>
  date.toISOString().slice(0, 10).replaceAll('-', '.');
export const readingTime = (body: string = '') =>
  Math.max(1, Math.ceil(body.length / 400));
