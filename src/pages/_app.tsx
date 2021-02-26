import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

import '../styles/tailwind.css';

const App: React.FC<AppProps> = ({ Component, pageProps, router }) => (
  <Provider session={pageProps.session}>
    <Head>
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>
    <Component {...pageProps} />
  </Provider>
);
export default App;
