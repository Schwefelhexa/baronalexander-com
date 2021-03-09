import { useSession } from 'next-auth/client';
import React from 'react';
import tw from 'twin.macro';

import { usePreviewMode } from '../core/preview';

const Heading = tw.h1`text-6xl font-medium text-yellow-600`;
const Small = tw.small`text-sm text-gray-600`;
const Button = tw.button`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`;

interface IndexPageProps {}
const IndexPage: React.FC<IndexPageProps> = () => {
  const [session, loadingSession] = useSession();
  const [preview, setPreview] = usePreviewMode();

  return (
    <div tw="flex flex-col h-full justify-center items-center space-y-4">
      <Heading>Hello World!</Heading>
      {preview && <Small>You are in preview mode</Small>}
      {!loadingSession && session && (
        <Button onClick={() => setPreview(!preview)}>
          Toggle preview mode
        </Button>
      )}
    </div>
  );
};
export default IndexPage;
