import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import { Date } from 'components/Date';
import { Layout } from 'components/Layout';
import Seo from 'components/Seo';
import { Toc } from 'components/Toc';
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
      <Seo pageTitle={postData.title} pageImg={postData.thumbnail} />
      <div className='flex justify-center'>
        <article className='w-11/12 lg:w-1/2 lg:ml-16'>
          <div className='my-24'>
            <h1 className='mb-6'>{postData.title}</h1>
            <div className='text-lightGray mt-2 pl-2'>
              <Date dateString={postData.createdDate} />
            </div>
          </div>
          <div className='post' dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
        <div className='hidden break-words lg:block lg:w-1/4 ml-16 mt-48'>
          <div className='sticky top-32 overflow-auto h-600'>
            <Toc />
          </div>
        </div>
      </div>
    </Layout>
  );
}
