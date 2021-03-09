import { useSession } from 'next-auth/client';
import React from 'react';
import tw from 'twin.macro';
import { gql } from 'graphql-request';

import { usePreviewMode } from '../core/preview';
import { IndexPageQuery } from '../generated/graphql';
import { GetStaticProps } from 'next';
import client from '../core/data/client';

const Heading = tw.h1`text-6xl font-medium text-yellow-600`;
const Small = tw.small`text-sm text-gray-600`;
const Button = tw.button`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`;

const INDEX_PAGE_QUERY = gql`
  query IndexPage {
    blogPostCollection {
      total
    }
  }
`;

interface IndexPageProps {
  data: IndexPageQuery;
}
const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const [session, loadingSession] = useSession();
  const [preview, setPreview] = usePreviewMode();

  return (
    <div tw="flex flex-col h-full justify-center items-center space-y-4">
      <Heading>Hello World!</Heading>
      {preview && <Small>You are in preview mode</Small>}
      {!loadingSession && session && (
        <Button onClick={() => setPreview(!preview)}>
          Toggle preview mode
        </Button>
      )}
      <Small>
        {data.blogPostCollection?.total} blog post(s) have been published
      </Small>
    </div>
  );
};
export default IndexPage;

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
  const data = await client.request<IndexPageQuery>(INDEX_PAGE_QUERY);
  return {
    props: { data },
    revalidate: 60,
  };
};
