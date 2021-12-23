import type { InferGetServerSidePropsType, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
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
      <div className='w-11/12 md:w-10/12 m-auto mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {allPostsData.map(({ id, date, title, thumbnail }) => (
          <div
            key={id}
            className='flex flex-col border transition delay-75 border-darkGray p-5 hover:border-cyan'
          >
            <Link href='posts/[id]' as={`/posts/${id}`}>
              <a className='flex flex-col justify-between text-milkyWhite mt-2 pl-2 w-full h-full transition delay-75 hover:text-cyan'>
                <Image src={thumbnail} width={840} height={540} objectFit='contain' alt='' />
                <div className='text-xl font-bold'>{title}</div>
                <div className='text-lightGray text-sm mt-3 pl-2'>
                  <Date dateString={date} />
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}
