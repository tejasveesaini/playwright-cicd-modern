//To create a fixture in Playwright, you follow a three-step process: 
// Define the logic, Extend the **base test**, and Use it in your test file
import { test as base, expect } from '@playwright/test';
import { GoogleNewsPage } from '../pages/googlenewspage';
import { BusinessNewsPage } from '../pages/businessNewsPage';

type TestFixtures = {
    googleNewsPage: GoogleNewsPage;
    businessNewsPage: BusinessNewsPage;
}
//base.extend is how you register Fixtures
export const test = base.extend<TestFixtures>({
    googleNewsPage: async ({ page }, use) => {
        await page.goto('/');
        test.info().annotations.push({ type: 'info', description: 'Navigating to Google News...' });
        const googleNewsPage = new GoogleNewsPage(page);
        await use(googleNewsPage);
    },
    businessNewsPage: async ({ page }, use) => {
        await page.goto('/');
        test.info().annotations.push({ type: 'info', description: 'Navigating to Google News...' });
        const businessNewsPage = new BusinessNewsPage(page);
        await use(businessNewsPage);
    }
});

export { expect };