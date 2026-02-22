export const env = {
    baseUrl: process.env.BASE_URL ?? 'http://localhost:3000',
    ipifyBaseUrl: process.env.IPIFY_BASE_URL ?? 'https://api.ipify.org',
    ipinfoBaseUrl: process.env.IPINFO_BASE_URL ?? 'https://ipinfo.io',
} as const;
