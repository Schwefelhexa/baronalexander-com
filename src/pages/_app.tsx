import React from 'react';
import { AppProps } from 'next/app';

import '../styles/tailwind.css';
import { Provider } from 'next-auth/client';
import { AnimateSharedLayout } from 'framer-motion';

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <AnimateSharedLayout>
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  </AnimateSharedLayout>
);
export default App;
