/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly CONTENTFUL_SPACE: string;
    readonly CONTENTFUL_TOKEN: string;

    readonly AUTH_GOOGLE_ID: string;
    readonly AUTH_GOOGLE_SECRET: string;
    readonly AUTH_JWT_SECRET: string;

    readonly PREVIEW_USERS: string;
  }
}
