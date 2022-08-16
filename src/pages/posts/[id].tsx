import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import { AiOutlineCalendar } from 'react-icons/ai';
import { MdUpdate } from 'react-icons/md';
import { Comments } from 'components/Comments';
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
      <div className='w-11/12 mt-16 mb-8 md:mt-24 md:mb-16 mx-auto text-center'>
        <h1 className='mb-6'>{postData.title}</h1>
        <div className='flex items-center justify-center text-midGrey mt-12 text-sm'>
          <MdUpdate className='mr-1 text-base' />
          <Date dateString={postData.updatedDate} />
          <AiOutlineCalendar className='ml-5 mr-1' />
          <Date dateString={postData.createdDate} />
        </div>
      </div>
      <div className='flex justify-center'>
        <article className='w-11/12 lg:w-3/5 xl:w-1/2 xl:ml-16'>
          <div className='post' dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          <div className='mt-10'>
            <h2 className='mb-2'>Comments</h2>
            <Comments />
          </div>
        </article>
        <div className='hidden break-words lg:block lg:w-1/4 lg:ml-10 mt-16'>
          <div className='sticky top-32 overflow-auto h-600'>
            <Toc />
          </div>
        </div>
      </div>
    </Layout>
  );
}
