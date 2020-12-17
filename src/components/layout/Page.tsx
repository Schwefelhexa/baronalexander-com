import React from 'react';
import PreviewIndicator from './PreviewIndicator';

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
      <div className="absolute inset-x-0 top-0">
        <PreviewIndicator preview={preview} setPreview={setPreview} />
      </div>
    )}
    <main className="w-full h-full px-32 py-16">{children}</main>
  </div>
);
export default Page;
