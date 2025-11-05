/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_WEBSOCKET_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_ENABLE_MOCK_API: string
  readonly VITE_ENABLE_WEBSOCKETS: string
  readonly VITE_ENCRYPTION_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
