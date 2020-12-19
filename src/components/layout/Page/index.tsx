import React from 'react';
import PreviewIndicator from '../PreviewIndicator';
import { PageContextProvider } from './PageHero';

export interface PageProps {
  loggedIn: boolean;
  preview: boolean;
  setPreview: (preview: boolean) => void;

  children: React.ReactNode;
}
const Page: React.FC<PageProps> = ({
  loggedIn,
  preview,
  setPreview,
  children,
}) => (
  <div className="w-full h-full relative">
    {loggedIn && (
      <div className="absolute inset-x-0 top-0 z-30">
        <PreviewIndicator preview={preview} setPreview={setPreview} />
      </div>
    )}
    <PageContextProvider>
      {(hero) => (
        <main className="w-full min-h-full">
          {hero && <div>{hero}</div>}
          <div className="px-32 py-16">{children}</div>
        </main>
      )}
    </PageContextProvider>
  </div>
);
export default Page;

export { PageHero } from './PageHero';