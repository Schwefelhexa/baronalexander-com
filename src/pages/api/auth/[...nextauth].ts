import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { InitOptions } from 'next-auth';
import Providers from 'next-auth/providers';

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
    signIn: async (user) => {
      if (!user.email) return false;

      const allowed = JSON.parse(process.env.PREVIEW_USERS) as string[];
      return allowed.includes(user.email!);
    },
  },
} as InitOptions;

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
