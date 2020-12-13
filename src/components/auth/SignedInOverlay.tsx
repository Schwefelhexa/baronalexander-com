import { useSession } from 'next-auth/client';
import Link from 'next/link';
import React from 'react';

const SignedInOverlay: React.FC = () => {
  const [session, loading] = useSession();

  if (loading || !session) return null;
  return (
    <div className="fixed right-0 bottom-0 mr-8 mb-3">
      <Link href="/auth">
        <a className="text-primary font-semibold md:text-xl xl:text-2xl">
          Logged in
        </a>
      </Link>
    </div>
  );
};
export default SignedInOverlay;
