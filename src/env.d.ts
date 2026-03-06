/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SCALEKIT_ENVIRONMENT_URL: string;
  readonly SCALEKIT_CLIENT_ID: string;
  readonly SCALEKIT_CLIENT_SECRET: string;
  readonly SCALEKIT_REDIRECT_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    user?: {
      sub: string;
      email?: string;
      name?: string;
    };
  }
}
