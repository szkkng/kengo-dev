import type { InferGetServerSidePropsType, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineCalendar } from 'react-icons/ai';
import { MdUpdate } from 'react-icons/md';
import { Date } from 'components/Date';
import { Layout, siteTitle } from 'components/Layout';
import Seo from 'components/Seo';
import { getSortedPostsData } from 'lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }: InferGetServerSidePropsType<typeof getStaticProps>) {
  return (
    <Layout home>
      <Seo pageTitle={siteTitle} />
      <div className='w-11/12 m-auto mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {allPostsData.map(({ id, createdDate, updatedDate, title, thumbnail }) => (
          <div
            key={id}
            className='flex flex-col border transition delay-75 border-darkGrey hover:border-cyan hover:border-opacity-50'
          >
            <Link href='posts/[id]' as={`/posts/${id}`}>
              <a className='flex flex-col justify-between text-cream mt-2 p-5 w-full h-full transition delay-75 hover:text-cyan'>
                <Image src={thumbnail} width={840} height={540} objectFit='contain' alt='' />
                <div className='text-center text-xl font-bold mt-2'>{title}</div>
                <div className='flex items-center justify-center  text-midGrey mt-3 text-sm'>
                  <MdUpdate className='mr-1 text-base' />
                  <Date dateString={updatedDate} />
                  <AiOutlineCalendar className='ml-5 mr-1' />
                  <Date dateString={createdDate} />
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}
