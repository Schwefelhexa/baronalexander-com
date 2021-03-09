/// <reference types="next" />
/// <reference types="next/types/global" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly CMS_URL: string;
      readonly CMS_TOKEN: string;

      readonly CMS_PREVIEW_URL: string;
      readonly CMS_PREVIEW_TOKEN: string;

      readonly AUTH_GOOGLE_ID: string;
      readonly AUTH_GOOGLE_SECRET: string;
      readonly AUTH_JWT_SECRET: string;
      readonly AUTH_JWT_SIGNING_KEY: string;
    }
  }
}
