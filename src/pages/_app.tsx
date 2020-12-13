import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/tailwind.css';
import { Provider } from 'next-auth/client';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Alexander Baron</title>
      <meta name="description" content="Alexander Baron's Website" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="prefetch"
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&amp;display=swap"
        as="style"
      />
    </Head>
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  </>
);

export default MyApp;
