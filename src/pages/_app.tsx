import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/tailwind.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Alexander Baron</title>
      <meta name="description" content="Alexander Baron's Website" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default MyApp;
