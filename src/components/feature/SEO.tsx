import React from 'react';
import { gql } from 'graphql-request';
import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';

import { SeoFragment } from '../../generated/graphql';

export const SEO_FRAGMENT = gql`
  fragment SEO on SeoField {
    title
    image {
      url
      alt
      width
      height
    }
    description
    twitterCard
  }
`;

export interface SEOProps {
  data: SeoFragment | null | undefined;
  titlePrefix?: string;
}
const SEO: React.FC<SEOProps> = ({ data, titlePrefix }) => (
  <Head>
    <meta name="author" content="Alexander Baron" />
    <meta property="og:site_name" content="Alexander Baron" />

    {data?.title && (
      <>
        <title>
          {titlePrefix ? titlePrefix + ' - ' : ''}
          {data.title}
        </title>
        <meta name="twitter:title" content={data.title} />
        <meta property="og:title" content={data.title} />
      </>
    )}
    {data?.description && (
      <>
        <meta name="description" content={data.description} />
        <meta name="twitter:description" content={data.description} />
        <meta property="og:description" content={data.description} />
      </>
    )}

    {data?.image && (
      <>
        <meta name="twitter:image" content={data.image.url} />
        <meta property="og:image" content={data.image.url} />
        {data.image.width && (
          <meta property="og:image:width" content={data.image.width} />
        )}
        {data.image.height && (
          <meta property="og:image:height" content={data.image.height} />
        )}
        {data.image.alt && (
          <>
            <meta property="og:image:alt" content={data.image.alt} />
            <meta name="twitter:image:alt" content={data.image.alt} />
          </>
        )}
      </>
    )}

    {data?.twitterCard && (
      <meta name="twitter:card" content={data.twitterCard} />
    )}
  </Head>
);
export default SEO;
