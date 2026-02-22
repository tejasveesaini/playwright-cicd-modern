import { test, expect } from '../../fixtures/pages.fixture';

test.describe('Temperature Tests', () => {
    test('Get the current temperature', async ({ googleNewsPage }) => {
        const temperature = await googleNewsPage.getTemperature();
        expect(temperature).toBeTruthy();
        console.log(`Current Temperature: ${temperature}`);
    });
});
