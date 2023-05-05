import { Metadata } from 'next';
import { AiOutlineCalendar } from 'react-icons/ai';
import { MdUpdate } from 'react-icons/md';
import Comments from '@/components/Comments';
import Date from '@/components/Date';
import Layout from '@/components/Layout';
import Toc from '@/components/Toc';
import { getAllPostIds, getPostData } from '@/lib/posts';

export const generateStaticParams = async () => getAllPostIds().map((post) => ({ slug: post.id }));

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const postData = await getPostData(params.slug);
  return {
    title: postData.title,
    description: '',
    openGraph: {
      title: postData.title,
      description: '',
      siteName: postData.title,
      url: `https://kengo.dev/${params.slug}`,
      images: [{ url: `https://kengo.dev${postData.thumbnail}`, width: 800, height: 600 }],
      locale: 'en-US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: postData.title,
      description: '',
      creator: '@kng_dev',
      images: [`https://kengo.dev${postData.thumbnail}`],
    },
  };
};

const Post = async ({ params }: { params: { slug: string } }) => {
  const postData = await getPostData(params.slug);

  return (
    <Layout>
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
};

export default Post;
