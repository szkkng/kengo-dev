import { compareDesc } from 'date-fns';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { AiOutlineCalendar } from 'react-icons/ai';
import { MdUpdate } from 'react-icons/md';
import PostDate from '@/components/Date';
import { allPosts } from 'contentlayer/generated';

const Home = async () => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.createdDate), new Date(b.createdDate)),
  );

  return (
    <div className='w-11/12 m-auto mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
      {posts.map(({ url, createdDate, updatedDate, title, thumbnail }) => (
        <div
          key={url}
          className='flex flex-col border transition delay-75 border-darkGrey hover:border-cyan hover:border-opacity-50'
        >
          <Link
            href={url}
            className='flex flex-col justify-between text-cream mt-2 p-5 w-full h-full transition delay-75 hover:text-cyan'
          >
            <Image src={thumbnail} width={840} height={540} objectFit='contain' alt='' />
            <div className='text-center text-xl font-bold mt-2'>{title}</div>
            <div className='flex items-center justify-center  text-midGrey mt-3 text-sm'>
              <MdUpdate className='mr-1 text-base' />
              <PostDate dateString={updatedDate} />
              <AiOutlineCalendar className='ml-5 mr-1' />
              <PostDate dateString={createdDate} />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
