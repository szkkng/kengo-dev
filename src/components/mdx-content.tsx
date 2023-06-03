'use client';

import { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer/hooks';

// Define your custom MDX components.
const mdxComponents: MDXComponents = {
  // Override the default <a> element to use the next/link component.
  // a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  // Add a custom component.
  // MyComponent: () => <div className='text-cream'>Hello World!</div>,
};

const MDXContent = ({ code }: { code: string }) => {
  const MDXBody = useMDXComponent(code);
  return <MDXBody components={mdxComponents} />;
};

export default MDXContent;
