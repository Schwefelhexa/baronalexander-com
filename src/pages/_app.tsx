import React from 'react';
import { AppProps } from 'next/app';

import '../styles/tailwind.css';
import { Provider } from 'next-auth/client';

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Provider session={pageProps.session}>
    <Component {...pageProps} />
  </Provider>
);
export default App;
