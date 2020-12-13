import React from 'react';
import classNames from 'classnames';
import { useSession } from 'next-auth/client';
import Link from 'next/link';

interface Props {
  noPadding?: boolean;
  noScroll?: boolean;
  children: React.ReactNode;
}
const Page: React.FC<Props> = ({
  children,
  noPadding = false,
  noScroll = false,
}) => {
  const [session, loading] = useSession();

  return (
    <div className="relative w-full h-full">
      <div
        className={classNames('font-medium leading-tight relative', {
          'px-8 py-7 lg:mx-auto lg:py-12 lg:w-2/3 max-w-5xl': !noPadding,
          'h-full': noScroll,
          'min-h-full': !noScroll,
        })}
      >
        {children}
      </div>
      {!loading && session !== null && (
        <div className="fixed right-0 bottom-0 mr-8 mb-3">
          <Link href="/auth">
            <a className="text-primary font-semibold md:text-xl xl:text-2xl">
              Logged in
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Page;
