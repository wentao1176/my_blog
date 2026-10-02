export const withBase = (path, base = '/') =>
  `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const published = (posts) =>
  posts
    .filter((p) => !p.data.draft)
    .sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
    );
export const matchesPost = (post, query = '', category = '全部') => {
  const { title, description, tags, category: kind } = post.data;
  return (
    (category === '全部' || kind === category) &&
    [title, description, ...tags]
      .join(' ')
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  );
};
