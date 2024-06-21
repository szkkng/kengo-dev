import { glob } from 'fast-glob';
import Link from 'next/link';

const Home = async () => {
  const fileNames = await glob('**/*.mdx', { cwd: './app/(posts)' });
  const promises = fileNames.map(async (fileName) => {
    const { metadata } = await import(`./(posts)/${fileName}`);
    return { url: '/' + fileName.replace(/(^|\/)page\.mdx$/, ''), ...metadata };
  });
  const posts = await Promise.all(promises);

  return (
    <ul className='mt-6 flex w-full flex-col space-y-4'>
      {posts
        .sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1;
          }
          return 1;
        })
        .map(({ url, title, publishedAt }) => (
          <li key={url} className='flex space-x-4'>
            <time className='min-w-max pt-[6px] font-mono text-xs text-midGrey'>{publishedAt}</time>
            <Link key={url} href={url} className='flex w-full text-cream hover:text-cream/75'>
              {title}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default Home;
