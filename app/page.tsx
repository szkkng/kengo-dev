import Link from 'next/link';
import { getPosts } from '@/_lib/posts';

const Home = async () => {
  const posts = await getPosts();

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
