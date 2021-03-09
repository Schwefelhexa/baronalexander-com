import { gql } from 'graphql-request';
import { AuthorizedUserQueryVariables } from './../../../generated/graphql';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { InitOptions } from 'next-auth';
import Providers from 'next-auth/providers';
import client from '../../../core/data/client';
import { AuthorizedUserQuery } from '../../../generated/graphql';

const AUTHORIZED_USER_QUERY = gql`
  query AuthorizedUser($email: String!) {
    authorizedUserCollection(where: { email: $email }, preview: false) {
      items {
        email
        name
        canPreview
      }
      total
    }
  }
`;

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.AUTH_JWT_SECRET,
    encryption: false,
    signingKey: process.env.AUTH_JWT_SIGNING_KEY,
  },
  callbacks: {
    signIn: async ({ email }) => {
      if (!email) return false;

      const { authorizedUserCollection } = await client.request<
        AuthorizedUserQuery,
        AuthorizedUserQueryVariables
      >(AUTHORIZED_USER_QUERY, { email });

      return authorizedUserCollection?.total === 1;
    },
  },
} as InitOptions;

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
