import Link from 'next/link';

const Header = () => {
  return (
    <header className='py-5'>
      <Link href='/' className='text-xl font-medium text-cream hover:text-cream/75'>
        Kengo Suzuki
      </Link>
    </header>
  );
};

export default Header;
