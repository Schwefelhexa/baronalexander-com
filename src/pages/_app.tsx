import React from 'react';
import { AppProps } from 'next/app';
import { Provider, useSession } from 'next-auth/client';
import { AnimateSharedLayout } from 'framer-motion';

import Page from '../components/layout/Page';
import { usePreviewMode } from '../core/preview';
import '../styles/tailwind.css';

const AppWithProviders: React.FC = ({ children }) => {
  const [session, loading] = useSession();
  const [isPreview, setPreviewMode] = usePreviewMode();

  return (
    <Page
      loggedIn={!loading && session !== null}
      preview={isPreview}
      setPreview={(isPreview) => setPreviewMode(isPreview)}
    >
      {children}
    </Page>
  );
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <AnimateSharedLayout>
    <Provider session={pageProps.session}>
      <AppWithProviders>
        <Component {...pageProps} />
      </AppWithProviders>
    </Provider>
  </AnimateSharedLayout>
);
export default App;
