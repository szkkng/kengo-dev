import type { InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Layout, siteTitle } from 'components/layout';
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
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className='space-y-9'>
        {allPostsData.map(({ id, date, title }) => (
          <div key={id}>
            <Link href='posts/[id]' as={`/posts/${id}`}>
              <a className='text-milkyWhite text-xl font-bold'>{title}</a>
            </Link>
            <br />
            <div className='text-lightGray text-sm mt-2 ml-2'>{date}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
