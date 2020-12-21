import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { Provider, useSession } from 'next-auth/client';
import { AnimateSharedLayout } from 'framer-motion';
import { Router } from 'next/router';

import Page from '../components/layout/Page';
import { usePreviewMode } from '../core/preview';
import '../styles/tailwind.css';
import DarkModeProvider from '../components/feature/dark_mode/DarkModeProvider';

interface AppWithProvidersProps {
  router: Router;
}
const AppWithProviders: React.FC<AppWithProvidersProps> = ({
  children,
  router,
}) => {
  const [session, loading] = useSession();
  const [isPreview, setPreviewMode] = usePreviewMode();

  return (
    <Page
      loggedIn={!loading && session !== null}
      preview={isPreview}
      setPreview={(isPreview) =>
        setPreviewMode(isPreview).then(() => router.reload())
      }
    >
      {children}
    </Page>
  );
};

const App: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setElement(document.getElementsByTagName('html')[0] as HTMLElement);
  }, []);

  return (
    <AnimateSharedLayout>
      <Provider session={pageProps.session}>
        <DarkModeProvider container={element}>
          <AppWithProviders router={router}>
            <Component {...pageProps} />
          </AppWithProviders>
        </DarkModeProvider>
      </Provider>
    </AnimateSharedLayout>
  );
};
export default App;
