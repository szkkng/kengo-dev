import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AiOutlineCalendar } from 'react-icons/ai';
import { MdUpdate } from 'react-icons/md';
import Comments from '@/_components/comments';
import PostDate from '@/_components/date';
import MDXContent from '@/_components/mdx-content';
import Toc from '@/_components/toc';
import { allPosts } from 'contentlayer/generated';

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (post == null) throw new Error(`Post not found for slug: ${params.slug}`);

  return {
    title: post.title,
    description: '',
    openGraph: {
      title: post.title,
      description: '',
      siteName: post.title,
      url: `https://kengo.dev/${params.slug}`,
      images: [{ url: `https://kengo.dev${post.thumbnail}`, width: 800, height: 600 }],
      locale: 'en-US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: '',
      creator: '@kng_dev',
      images: [`https://kengo.dev${post.thumbnail}`],
    },
  };
};

const Post = async ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  if (post == null) notFound();

  return (
    <>
      <div className='mx-auto mb-8 mt-16 w-11/12 text-center md:mb-16 md:mt-24'>
        <h1 className='mb-6'>{post.title}</h1>
        <div className='mt-12 flex items-center justify-center text-sm text-midGrey'>
          <MdUpdate className='mr-1 text-base' />
          <PostDate dateString={post.updatedDate} />
          <AiOutlineCalendar className='ml-5 mr-1' />
          <PostDate dateString={post.createdDate} />
        </div>
      </div>
      <div className='flex justify-center'>
        <article className='w-11/12 lg:w-3/5 xl:ml-16 xl:w-1/2'>
          <div className='post'>
            <MDXContent code={post.body.code} />
          </div>
          <div className='mt-10'>
            <h2 className='mb-2'>Comments</h2>
            <Comments />
          </div>
        </article>
        <div className='mt-16 hidden break-words lg:ml-10 lg:block lg:w-1/4'>
          <div className='sticky top-32 overflow-auto'>
            <Toc />
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
