import React from 'react';
import Head from 'next/head';
// import { Container } from './styles';
interface SEOProps {
  title: string;
  description: string;
  type?: string;
  url: string;
  image: string;
  width?: string;
  height?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  type = 'website',
  url,
  image,
  width = '300',
  height = '300',
}) => {
  const defaultDescription =
    'Talia is your best source of FUN! Explore Talia for the most popular memes, breaking stories, awesome GIFs, and viral videos on the internet!';

  return (
    <Head>
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" itemProp="image" content={image} />
      <meta property="og:image:width" content={width} />
      <meta property="og:image:height" content={height} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@taliaapp" />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

export default SEO;
