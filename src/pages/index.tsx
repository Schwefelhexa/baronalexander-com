import React from 'react';
import Page from '../components/layout/Page';
import { useSession } from 'next-auth/client';
import { usePreviewMode } from '../core/preview';
import Header from '../components/atomic/Header';

const IndexPage: React.FC = () => {
  const [session, loading] = useSession();
  const [isPreview, setPreviewMode] = usePreviewMode();

  return (
    <Page
      loggedIn={!loading && session !== null}
      preview={isPreview}
      setPreview={(isPreview) => setPreviewMode(isPreview)}
    >
      <div className="w-full h-full flex flex-col">
        <Header>Alexander Baron.</Header>
      </div>
    </Page>
  );
};
export default IndexPage;
