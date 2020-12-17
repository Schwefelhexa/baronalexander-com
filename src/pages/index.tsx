import React from 'react';
import { gql, GraphQLClient } from 'graphql-request';
import { GetStaticProps } from 'next';
import Page from '../components/layout/Page';
import { useSession } from 'next-auth/client';
import { usePreviewMode } from '../core/preview';

interface Props {
  data: any;
}
const IndexPage: React.FC<Props> = ({ data }) => {
  const [session, loading] = useSession();
  const [isPreview, setPreviewMode] = usePreviewMode();

  return (
    <Page
      loggedIn={!loading && session !== null}
      preview={isPreview}
      setPreview={(isPreview) => setPreviewMode(isPreview)}
    >
      <div className="flex flex-col justify-center items-center w-full h-full">
        <h1 className="text-9xl font-semibold text-gray-800">Hello World!</h1>
        <p>Page name: "{data._site.globalSeo.siteName}"</p>
        <button onClick={() => setPreviewMode(!isPreview)}>
          Preview: {JSON.stringify(isPreview)}
        </button>
      </div>
    </Page>
  );
};
export default IndexPage;

const QUERY = gql`
  query IndexPage {
    _site {
      globalSeo {
        siteName
      }
    }
  }
`;
export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`;

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
    },
  });
  const data = await client.request(QUERY);

  return { props: { data } };
};
