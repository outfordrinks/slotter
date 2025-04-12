export const config = {
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
};
// Type-safe environment helpers
export function requireEnvVar(name) {
    const value = import.meta.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}
