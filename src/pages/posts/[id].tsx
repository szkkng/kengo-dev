import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Date } from 'components/date';
import { Layout } from 'components/layout';
import Seo from 'components/seo';
import { getAllPostIds, getPostData } from 'lib/posts';

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const id = typeof params?.id === 'string' ? params.id : '';
  const postData = await getPostData(id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }: InferGetServerSidePropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo pageTitle={postData.title} pageImg={postData.image} />
      <article>
        <h1 className='mb-8 mt-5'>{postData.title}</h1>
        <div className='mb-16 sm:mb-20 text-sm text-center text-lightGray'>
          <Date dateString={postData.date} />
        </div>
        <div className='markdown' dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
