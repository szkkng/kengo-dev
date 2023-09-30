import { compareDesc } from 'date-fns';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { AiOutlineCalendar } from 'react-icons/ai';
import { MdUpdate } from 'react-icons/md';
import PostDate from '@/_components/date';
import { allPosts } from 'contentlayer/generated';

const Home = async () => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.createdDate), new Date(b.createdDate)),
  );

  return (
    <div className='m-auto mt-6 grid w-11/12 gap-5 md:grid-cols-2 lg:grid-cols-3'>
      {posts.map(({ url, createdDate, updatedDate, title, thumbnail }) => (
        <div
          key={url}
          className='flex flex-col border border-darkGrey transition delay-75 hover:border-cyan/50'
        >
          <Link
            href={url}
            className='mt-2 flex h-full w-full flex-col justify-between p-5 text-cream transition delay-75 hover:text-cyan'
          >
            <Image src={thumbnail} width={840} height={540} objectFit='contain' alt='' />
            <div className='mt-2 text-center text-xl font-bold'>{title}</div>
            <div className='mt-3 flex items-center  justify-center text-sm text-midGrey'>
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
