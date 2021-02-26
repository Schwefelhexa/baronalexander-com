import { useSession } from 'next-auth/client';
import React from 'react';
import { usePreviewMode } from '../core/preview';

interface IndexPageProps {}
const IndexPage: React.FC<IndexPageProps> = () => {
  const [session, loadingSession] = useSession();
  const [preview, setPreview] = usePreviewMode();

  return (
    <div>
      <h1>Hello World!</h1>
      {preview && <p>You are in preview mode</p>}
      {!loadingSession && session && (
        <button onClick={() => setPreview(!preview)}>
          Toggle preview mode
        </button>
      )}
    </div>
  );
};
export default IndexPage;
