import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'next-auth/client';

import '../styles/tailwind.css';
import AuthShortcuts from '../components/auth/AuthShortcuts';

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
      <AuthShortcuts />
    </Provider>
  </>
);

export default MyApp;
