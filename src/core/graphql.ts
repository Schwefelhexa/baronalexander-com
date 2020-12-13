import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${
    process.env.CONTENTFUL_SPACE
  }?access_token=${encodeURIComponent(process.env.CONTENTFUL_TOKEN)}`,
  cache: new InMemoryCache(),
});
export default client;
