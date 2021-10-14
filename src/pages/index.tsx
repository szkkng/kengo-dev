import type { InferGetServerSidePropsType, NextPage } from 'next';
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
      <div className='space-y-9'>
        {allPostsData.map(({ id, date, title }) => (
          <div key={id}>
            <Link href='posts/[id]' as={`/posts/${id}`}>
              <a className='text-milkyWhite text-xl font-bold'>{title}</a>
            </Link>
            <br />
            <div className='text-lightGray text-opacity-80 text-sm mt-2 ml-2'>
              <Date dateString={date} />
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
