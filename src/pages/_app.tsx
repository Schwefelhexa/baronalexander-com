import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

import GlobalStyles from '../styles/GlobalStyles';

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Provider session={pageProps.session}>
    <GlobalStyles />
    <Head>
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>

    <Component {...pageProps} />
  </Provider>
);
export default App;
