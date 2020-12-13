import React, { useEffect } from 'react';
import classNames from 'classnames';
import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const listener = (e: KeyboardEvent) => {
      if (Object.keys(e.target ?? {}).includes('value')) return; // Not interested in events inside an <input />
      if (!e.shiftKey || !e.altKey || !e.ctrlKey) return; // Make it VERY unlikely to type this by accident

      if (e.key === 'L') {
        if (session) {
          if (router.pathname === '/auth') signOut();
          else router.push('/auth');
        } else signIn('google');
      }
    };
    window.addEventListener('keyup', listener);
    return () => window.removeEventListener('keyup', listener);
  }, [session, loading, router]);

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
