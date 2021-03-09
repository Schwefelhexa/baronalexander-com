import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(process.env.CMS_URL as string, {
  headers: {
    Authorization: `Bearer ${process.env.CMS_TOKEN}`,
  },
});
export default client;
