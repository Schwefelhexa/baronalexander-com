import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { getSession, signOut } from 'next-auth/client';
import Page from '../components/layout/Page';
import usePreview from '../core/hooks/usePreview';

const AuthPage: React.FC = () => {
  const [preview, setPreview] = usePreview();

  // I know this looks disgusting, but I'ts internal so I don't care right now
  return (
    <Page>
      <button onClick={() => setPreview(!preview)}>
        You are {!preview && 'not'} in preview mode
      </button>
      <Link href="/">
        <a className="block my-4">Home</a>
      </Link>
      <button onClick={() => setPreview(false).then(() => signOut())}>
        Sign out
      </button>
    </Page>
  );
};
export default AuthPage;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  preview,
}) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
};
