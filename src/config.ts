interface Config {
  app: {
    title: string;
  };
  api: {
    url: string;
  };
  figma: {
    apiUrl: string;
    accessToken?: string;
  };
}

export const config: Config = {
  app: {
    title: import.meta.env.VITE_APP_TITLE || 'Slotter',
  },
  api: {
    url: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  },
  figma: {
    apiUrl: import.meta.env.VITE_FIGMA_API_URL || 'https://api.figma.com/v1',
    accessToken: import.meta.env.VITE_FIGMA_ACCESS_TOKEN,
  },
} as const;

// Type-safe environment helpers
export function requireEnvVar(name: keyof typeof import.meta.env): string {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
} 