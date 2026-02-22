import type { APIRequestContext, APIResponse } from '@playwright/test';
import { env } from '../config/env';

export interface IpifyResponse {
    ip: string;
}

export interface IpInfoResponse {
    ip: string;
    city?: string;
    region?: string;
    country?: string;
    loc?: string;
    org?: string;
    timezone?: string;
    [key: string]: unknown;
}

export class IpLookupApi {
    constructor(private readonly request: APIRequestContext) { }

    async getPublicIp(): Promise<{ response: APIResponse; data: IpifyResponse }> {
        const response = await this.request.get(env.ipifyBaseUrl, {
            params: { format: 'json' },
        });

        const data = (await response.json()) as IpifyResponse;
        return { response, data };
    }

    async getIpDetails(ip: string): Promise<{ response: APIResponse; data: IpInfoResponse }> {
        const response = await this.request.get(`${env.ipinfoBaseUrl}/${ip}/json`);
        const data = (await response.json()) as IpInfoResponse;
        return { response, data };
    }
}
