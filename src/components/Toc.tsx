import { useEffect } from 'react';
import tocbot from 'tocbot';

export const Toc: React.VFC = () => {
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.post',
      headingSelector: 'h2, h3, h4',
      orderedList: false,
      scrollSmoothOffset: -100,
      headingsOffset: 100,
      scrollSmoothDuration: 400,
    });

    return () => tocbot.destroy();
  }, []);

  return (
    <>
      <div className='toc' />
    </>
  );
};
