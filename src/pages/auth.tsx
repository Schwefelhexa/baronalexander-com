import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { getSession } from 'next-auth/client';
import Page from '../components/layout/Page';

interface Props {
  preview: boolean;
}
const AuthPage: React.FC<Props> = (inital) => {
  const [preview, _setPreview] = useState(inital.preview);

  const setPreview = (preview: boolean) => {
    fetch(`/api/auth/preview?enable=${preview}`).then(() =>
      _setPreview(preview)
    );
  };

  // I know this looks disgusting, but I'ts internal so I don't care right now
  return (
    <Page>
      <button onClick={() => setPreview(!preview)}>
        You are {!preview && 'not'} in preview mode
      </button>
      <Link href="/">
        <a className="block mt-4">Home</a>
      </Link>
    </Page>
  );
};
export default AuthPage;

export const getServerSideProps: GetServerSideProps<Props> = async ({
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

  return { props: { preview: preview ?? false } };
};
