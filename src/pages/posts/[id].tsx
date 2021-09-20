import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Date } from 'components/date';
import { Layout } from 'components/layout';
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
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className='mb-7 mt-5'>{postData.title}</h1>
        <div className='mb-12 text-sm text-center text-gray-500'>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
