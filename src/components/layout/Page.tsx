import React from 'react';
import classNames from 'classnames';

import PreviewIndicator from './PreviewIndicator';

export interface PageMainProps {
  className?: string;
  noTopPadding?: boolean;
}
const PageMain: React.FC<PageMainProps> = ({
  className,
  children,
  noTopPadding = false,
}) => (
  <main
    className={classNames(
      'px-32 pb-16 ',
      { 'pt-16': !noTopPadding },
      className
    )}
  >
    {children}
  </main>
);

export interface PageProps {
  loggedIn: boolean;
  preview: boolean;
  setPreview: (preview: boolean) => void;

  children: React.ReactNode;
}
const Page: React.FC<PageProps> & { Main: typeof PageMain } = ({
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
    <div className="w-full min-h-full">{children}</div>
  </div>
);
Page.Main = PageMain;
export default Page;
