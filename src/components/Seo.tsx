import Head from 'next/head';
import { VFC } from 'react';

interface MetaData {
  pageTitle?: string;
  pageDescription?: string;
  pageImg?: string;
  pageImgWidth?: string;
  pageImgHeight?: string;
}

const Seo: VFC<MetaData> = ({ pageTitle, pageImg, pageImgWidth, pageImgHeight }) => {
  const defaultTitle = 'KENGO';
  const defaultImg = '/images/gigaverb-gen-juce/gigaverb-juce-finish.png';
  const title = pageTitle || defaultTitle;
  const img = 'https://suzuki-kengo.net' + (pageImg || defaultImg);
  const imgWidth = pageImgWidth || '1200';
  const imgHeight = pageImgHeight || '630';
  console.log(img);

  return (
    <Head>
      <title>{title}</title>
      <link rel='icon' href='favicon.png' />
      <meta property='og:title' content={title} />
      <meta property='og:site_name' content={defaultTitle} />
      <meta property='og:image' content={img} />
      <meta property='og:image:width' content={imgWidth} />
      <meta property='og:image:height' content={imgHeight} />
      <meta name='twitter:card' content='summary_large_image' />
    </Head>
  );
};

export default Seo;
