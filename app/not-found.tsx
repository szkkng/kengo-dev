import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not Found',
};

const NotFound = () => <h1 className='mt-6 text-cream'>Page Not Found</h1>;

export default NotFound;
