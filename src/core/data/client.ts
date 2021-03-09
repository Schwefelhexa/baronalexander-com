import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(process.env.CMS_URL, {
  headers: {
    Authorization: `Bearer ${process.env.CMS_TOKEN}`,
  },
});
export default client;
