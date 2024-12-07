import { getPosts } from '@/_lib/posts';

const sitemap = async () => {
  const posts = (await getPosts()).map(({ url, publishedAt }) => ({
    url: `https://kengo.dev${url}`,
    lastModified: publishedAt,
  }));

  return [
    {
      url: 'https://kengo.dev',
      lastModified: new Date(),
      priority: 1,
    },
    ...posts,
  ];
};

export default sitemap;
