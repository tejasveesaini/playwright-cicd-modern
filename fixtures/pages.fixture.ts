//To create a fixture in Playwright, you follow a three-step process: 
// Define the logic, Extend the **base test**, and Use it in your test file
import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homepage';
import { BusinessPage } from '../pages/businessPage';

type TestFixtures = {
    homePage: HomePage,
    businessPage: BusinessPage
}
//base.extend is how you register Fixtures
export const test = base.extend<TestFixtures>({
    homePage: async ({ page }, use) => {
        await page.goto('/');
        const homePage = new HomePage(page);
        await use(homePage);
    },

    businessPage: async ({ page }, use) => {
        const businessPage = new BusinessPage(page);
        await use(businessPage);
    }
});