import { test, expect } from '@playwright/test';
import { IpLookupApi } from './ipLookup.api';

const ipv4Regex = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;
test.describe('IP lookup APIs', () => {
    test('should fetch public IP from ipify and validate details from ipinfo', async ({ request }) => {
        const ipLookupApi = new IpLookupApi(request);
        const { response: ipifyResponse, data: ipifyData } = await ipLookupApi.getPublicIp();
        const { response: ipInfoResponse, data: ipInfoData } = await ipLookupApi.getIpDetails(ipifyData.ip);
        await test.step('validate ipify response', async () => {
            expect(ipifyResponse.ok()).toBeTruthy();
            expect(ipifyData.ip).toBeTruthy();
            expect(ipifyData.ip).toMatch(ipv4Regex);
        });
        await test.step('validate ipinfo response', async () => {
            expect(ipInfoResponse.ok()).toBeTruthy();
            expect(ipInfoData.ip).toBe(ipifyData.ip);
            expect(ipInfoData.country, `Expected country to be truthy for IP: ${ipifyData.ip}`).toBeTruthy();
            expect(ipInfoData.timezone, `Expected timezone to be truthy for IP: ${ipifyData.ip}`).toBeTruthy();
        });
    });
});
