/// <reference types="vite/client" />

// Sin esto, import.meta.env.VITE_API_URL seria any.
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
