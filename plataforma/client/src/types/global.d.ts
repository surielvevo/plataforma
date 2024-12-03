/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />

import { AxiosRequestConfig } from 'axios';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_API_URL: string;
      VITE_APP_NAME: string;
    }
  }

  interface Window {
    config: {
      apiUrl: string;
    };
  }
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    headers?: Record<string, string>;
  }
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

export {}; 