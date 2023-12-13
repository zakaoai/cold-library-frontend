/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="vite/client" />
declare const APP_VERSION: string

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_AUTH0_DOMAIN: string
  readonly VITE_API_AUTH0_CLIENT_ID: string
  readonly VITE_API_AUTH0_CALLBACK_URL: string
  readonly VITE_API_AUTH0_AUDIENCE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
