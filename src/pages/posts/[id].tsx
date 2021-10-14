import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import { Date } from 'components/Date';
import { Layout } from 'components/Layout';
import Seo from 'components/Seo';
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
      <article className='w-9/12 m-auto'>
        <div className='my-24'>
          <h1 className='mb-6'>{postData.title}</h1>
          <div className='text-sm text-lightGray pl-2'>
            <Date dateString={postData.date} />
          </div>
        </div>
        <div className='markdown' dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
