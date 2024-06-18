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
    <>
      {posts
        .sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1;
          }
          return 1;
        })
        .map(({ url, title, publishedAt }) => (
          <div key={url} className='flex w-full space-x-4'>
            <div className='min-w-max pt-[6.5px] text-sm text-midGrey'>{publishedAt}</div>
            <Link
              key={url}
              href={url}
              className='mb-6 flex flex-col space-y-2 overflow-x-auto text-xl text-cream transition delay-75 hover:text-cream/75'
            >
              {title}
            </Link>
          </div>
        ))}
    </>
  );
};

export default Home;
