import React from 'react';
import { gql, GraphQLClient } from 'graphql-request';
import { GetStaticProps } from 'next';

interface Props {
  data: any;
}
const IndexPage: React.FC<Props> = ({ data }) => (
  <div className="flex flex-col justify-center items-center w-full h-full">
    <h1 className="text-9xl font-semibold text-gray-800">Hello World!</h1>
    <p>Page name: "{data._site.globalSeo.siteName}"</p>
  </div>
);
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
