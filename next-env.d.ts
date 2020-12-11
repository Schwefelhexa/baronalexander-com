/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly CONTENTFUL_SPACE: string;
    readonly CONTENTFUL_TOKEN: string;
  }
}
