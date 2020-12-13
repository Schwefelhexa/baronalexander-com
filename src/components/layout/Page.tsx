import React from 'react';
import classNames from 'classnames';

interface Props {
  noPadding?: boolean;
  noScroll?: boolean;
  children: React.ReactNode;
}
const Page: React.FC<Props> = ({
  children,
  noPadding = false,
  noScroll = false,
}) => (
  <div
    className={classNames('font-medium leading-tight', {
      'px-8 py-7 lg:mx-auto lg:py-12 lg:w-2/3 max-w-5xl': !noPadding,
      'h-full': noScroll,
      'min-h-full': !noScroll,
    })}
  >
    {children}
  </div>
);
export default Page;
