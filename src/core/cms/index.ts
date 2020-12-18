import { GraphQLClient } from 'graphql-request';
import { RequestDocument } from 'graphql-request/dist/types';

const PUBLISHED_CLIENT = new GraphQLClient('https://graphql.datocms.com/', {
  headers: {
    authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
  },
});
const PREVIEW_CLIENT = new GraphQLClient(
  'https://graphql.datocms.com/preview',
  {
    headers: {
      authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
    },
  }
);

const getClient = (preview?: boolean): GraphQLClient =>
  preview ?? false ? PREVIEW_CLIENT : PUBLISHED_CLIENT;

export const queryCMS = async <TData, TVariables>(
  document: RequestDocument,
  preview?: boolean,
  variables?: TVariables
): Promise<TData> => {
  const response = await getClient(preview).request<TData, TVariables>(
    document,
    variables
  );
  return response;
};
