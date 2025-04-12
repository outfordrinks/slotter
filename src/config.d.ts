interface ImportMetaEnv {
    VITE_APP_TITLE: string;
    VITE_API_URL: string;
    VITE_FIGMA_API_URL: string;
    VITE_FIGMA_ACCESS_TOKEN?: string;
}
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
export declare const config: Config;
export declare function requireEnvVar(name: keyof ImportMetaEnv): string;
export {};
