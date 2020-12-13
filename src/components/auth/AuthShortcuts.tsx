import React, { useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

const AuthShortcuts: React.FC = () => {
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

  return null;
};
export default AuthShortcuts;
