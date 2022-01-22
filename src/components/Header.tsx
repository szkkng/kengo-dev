import Link from 'next/link';
import { FaGithub, FaTwitter, FaYoutube } from 'react-icons/fa';

export const Header = () => {
  return (
    <header className='py-5 border-b border-darkGray sticky top-0 bg-matteBlack bg-opacity-90 z-10'>
      <div className='container px-6 lg:px-12 mx-auto flex items-center'>
        <Link href='/'>
          <a className='text-milkyWhite text-2xl font-semibold'>KENGO</a>
        </Link>
        <div className='flex ml-auto'>
          <a
            className='text-lightGray mr-5 text-2xl hover:text-milkyWhite'
            href='https://github.com/szkkng'
          >
            <FaGithub />
          </a>
          <a
            className='text-lightGray mr-5 text-2xl hover:text-milkyWhite'
            href='https://twitter.com/zuken_1998'
          >
            <FaTwitter />
          </a>
          <a
            className='text-lightGray text-2xl hover:text-milkyWhite'
            href='https://www.youtube.com/channel/UCbYvkmJhbgt01FQKUdVJMWw/featured'
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </header>
  );
};
