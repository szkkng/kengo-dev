import Comments from '@/_components/comments';
import Toc from '@/_components/toc';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <article>
      <div className='mx-auto mb-8 mt-16 w-11/12 text-center md:mb-16 md:mt-24'>
        {/* <h1 className='mb-6'>{post.title}</h1> */}
        {/* <div className='mt-12 flex items-center justify-center text-sm text-midGrey'> */}
        {/* <MdUpdate className='mr-1 text-base' /> */}
        {/* <PostDate dateString={post.updatedDate} /> */}
        {/* <AiOutlineCalendar className='ml-5 mr-1' /> */}
        {/* <PostDate dateString={post.createdDate} /> */}
        {/* </div> */}
      </div>
      <div className='flex justify-center'>
        <article className='w-11/12 lg:w-3/5 xl:ml-16 xl:w-1/2'>
          <div className='post'>{children}</div>
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
    </article>
  );
};

export default Layout;
